from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import PyPDF2
from openai import OpenAI
import markdown
import logging
import re
from typing import List, Dict

app = Flask(__name__, static_folder="static")
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize OpenAI client for LM Studio
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

def load_pdf_data(pdf_paths):
    """Load and extract text from PDF files."""
    pdf_data = {}
    for pdf_path in pdf_paths:
        if os.path.exists(pdf_path):
            try:
                text = ""
                with open(pdf_path, 'rb') as file:
                    reader = PyPDF2.PdfReader(file)
                    for page in reader.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text
                text += "\n"
                pdf_name = os.path.basename(pdf_path)
                pdf_data[pdf_name] = text
                logger.info(f"Successfully loaded: {pdf_name}")
            except Exception as e:
                logger.error(f"Error loading PDF {pdf_path}: {str(e)}")
        else:
            logger.warning(f"PDF file not found: {pdf_path}")
    return pdf_data

# List of PDF paths - consider moving this to a config file
pdf_paths = [
    "/home/veeransh/Desktop/ziada/ziada_data/ziadaai_dataset_1.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Value Addition through Insurance Services.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Risk Mitigation and Protection Strategies .pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Recording Financial Transactions.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Operational Efficiency Improvement .pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Marketing Strategies for Service Providers (1).pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Loan Portfolio Management.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Lending and Borrowing.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Introduction to Credit Management.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Introduction to Accounting Principles.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Integrating Insurance Solutions into Services.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Fundamentals of Insurance and Financial Security.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Financial Statements and Analysis.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Financial Decision Making.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Credit Risk Assessment.pdf",
    "/home/veeransh/Desktop/ziada/ziada_data/Business Planning and Management Fundamentals.pdf",
]

# Load PDF data on startup
logger.info("Loading PDF data...")
pdf_data = load_pdf_data(pdf_paths)
logger.info(f"Loaded {len(pdf_data)} PDF files")

def find_relevant_pdfs(question, threshold=0.5):
    """Find PDFs containing content related to the question.
    Enhanced to use more sophisticated matching."""
    relevant = []
    q_keywords = set(question.lower().split())
    
    # Remove common words that don't add context
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'about', 'is', 'are', 'how', 'what', 'why', 'when', 'who', 'where'}
    q_keywords = q_keywords - stop_words
    
    for pdf_name, text in pdf_data.items():
        text_lower = text.lower()
        # Count how many keywords appear in the text
        matches = sum(1 for keyword in q_keywords if keyword in text_lower)
        if matches / max(len(q_keywords), 1) >= threshold:
            relevant.append(pdf_name)
            
    # If no PDF matches the threshold, take the top 3 most relevant
    if not relevant and q_keywords:
        pdf_scores = []
        for pdf_name, text in pdf_data.items():
            text_lower = text.lower()
            matches = sum(1 for keyword in q_keywords if keyword in text_lower)
            pdf_scores.append((pdf_name, matches))
        
        # Sort by number of matches and take top 3
        pdf_scores.sort(key=lambda x: x[1], reverse=True)
        relevant = [pdf[0] for pdf in pdf_scores[:3] if pdf[1] > 0]
    
    logger.info(f"Question: '{question}' - Found {len(relevant)} relevant PDFs")
    return relevant

def query_data(question, relevant_pdfs):
    """Prepare context from relevant PDFs for the model."""
    if not relevant_pdfs:
        # Use all PDFs but with limited content per PDF
        relevant_pdfs = list(pdf_data.keys())
        logger.info("No specific relevant PDFs found, using snippets from all")
    
    relevant_texts = ""
    for pdf_name in relevant_pdfs:
        if pdf_name in pdf_data:
            text = pdf_data[pdf_name]
            # If using all PDFs, limit each to a manageable excerpt
            if len(relevant_pdfs) == len(pdf_data):
                text = text[:1000] + "..." if len(text) > 1000 else text
            relevant_texts += f"Source Document: {pdf_name}\n{text}\n\n"
    
    system_message = (
        "You are a helpful assistant that provides accurate and detailed information based on "
        "the provided documents. When answering questions, cite your sources when possible. "
        "If the information cannot be found in the documents, clearly state that."
    )
    
    return system_message, relevant_texts, question

def generate_related_questions(question, num_questions=4):
    """Generate related questions to encourage further exploration."""
    try:
        prompt = (
            f"Based on the following question, generate {num_questions} related follow-up questions that are "
            f"concise, engaging, and relevant. Format each as a simple question.\n\n"
            f"Original Question: {question}"
        )
        
        response = client.chat.completions.create(
            model="llama-3.2-1b-instruct",  # Use the model available in LM Studio
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=250,  # Limit token usage for efficiency
        )
        
        content = response.choices[0].message.content
        questions = []
        for line in content.strip().split('\n'):
            line = line.strip()
            if line:
                # Clean up formatting from different list styles
                if line[0] in ('-', '*', '•'):
                    line = line[1:].strip()
                elif len(line) > 1 and line[0].isdigit() and line[1] in (')', '.', '-', ' '):
                    line = line[2:].strip()
                
                # Make sure it ends with a question mark and is reasonably sized
                if line and len(line) > 10 and not line.endswith('?'):
                    line += '?'
                
                questions.append(line)
        
        # Ensure we have the requested number if possible
        while len(questions) < num_questions and content:
            questions.append(f"Tell me more about {question.split()[0] if question.split() else 'this topic'}?")
            
        return questions[:num_questions]  # Limit to requested number
    
    except Exception as e:
        logger.error(f"Error generating related questions: {str(e)}")
        return [f"Can you elaborate on {question}?"]  # Fallback

def format_conversation_turn(role: str, content: str) -> Dict[str, str]:
    """Format a single conversation turn."""
    return {
        "role": role,
        "content": content
    }

def parse_conversation_history(history_str: str) -> List[Dict[str, str]]:
    """Parse conversation history from string format to list of messages."""
    if not history_str:
        return []
    
    turns = re.split(r'(User:|Assistant:)', history_str)
    turns = [t.strip() for t in turns if t.strip()]
    
    messages = []
    for i in range(0, len(turns)-1, 2):
        role = "user" if turns[i] == "User:" else "assistant"
        content = turns[i+1]
        messages.append(format_conversation_turn(role, content))
    
    return messages

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    """Serve the React application."""
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

@app.route("/predict", methods=['POST'])
def predict():
    """Process a query and return the response."""
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'Missing message parameter'}), 400

        user_message = data['message']
        conversation_history = data.get('history', '')
        
        logger.info(f"Received query: {user_message}")
        logger.info(f"Conversation history: {conversation_history}")
        
        # Parse conversation history
        previous_messages = parse_conversation_history(conversation_history)
        
        # Find relevant documents
        relevant_pdfs = find_relevant_pdfs(user_message)
        
        # Prepare the context for the model
        system_message, context, question = query_data(user_message, relevant_pdfs)
        
        # Structure the conversation for the model
        conversation = [
            {"role": "system", "content": system_message},
            *previous_messages,  # Include previous conversation
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}
        ]

        # Get response from the model
        completion = client.chat.completions.create(
            model="llama-3.2-1b-instruct",
            messages=conversation,
            temperature=0.6,
            max_tokens=800,
        )

        assistant_response = completion.choices[0].message.content
        related_questions = generate_related_questions(user_message)
        response_html = markdown.markdown(assistant_response)
        sources = [os.path.splitext(pdf)[0] for pdf in relevant_pdfs]
        
        return jsonify({
            'assistant': response_html,
            'related_questions': related_questions,
            'sources': sources,
            'raw_response': assistant_response  # Include raw response for history
        })

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return jsonify({
            'assistant': "I apologize, but I encountered an error processing your request. Please try again.",
            'error': str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5003, host='0.0.0.0')