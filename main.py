import smtplib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Allow CORS for all domains (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables for email config
MAIL_HOST = os.getenv('MAIL_HOST')  # e.g., smtp.hostinger.com
MAIL_PORT = int(os.getenv('MAIL_PORT', 587))  # Default to 587
MAIL_USERNAME = os.getenv('MAIL_USERNAME')  # info@kodaicoolstay.com
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')  # your Hostinger email password
MAIL_SENDER = os.getenv('MAIL_SENDER')  # info@kodaicoolstay.com
MAIL_RECEIVER = os.getenv('MAIL_RECEIVER')  # info@kodaicoolstay.com

# Common helper to send emails
def send_email(subject, body):
    try:
        server = smtplib.SMTP(MAIL_HOST, MAIL_PORT)
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)

        msg = MIMEMultipart()
        msg['From'] = MAIL_SENDER
        msg['To'] = MAIL_RECEIVER
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        server.sendmail(MAIL_SENDER, MAIL_RECEIVER, msg.as_string())
        server.quit()
    except smtplib.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# Booking Request Model
class BookingRequest(BaseModel):
    name: str
    phone: str
    message: str = None


@app.post("/send-booking")
async def send_booking(booking: BookingRequest):
    subject = f"Booking Request for Room"
    body = f"Name: {booking.name}\nPhone: {booking.phone}\nMessage: {booking.message}"
    send_email(subject, body)
    return {"message": "Booking email sent!"}


# Contact Form Model
class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.post("/send")
async def send(contact: ContactRequest):
    subject = f"New query from {contact.name}"
    body = f"Name: {contact.name}\nEmail: {contact.email}\nMessage: {contact.message}"
    send_email(subject, body)
    return {"message": "Contact form email sent!"}
