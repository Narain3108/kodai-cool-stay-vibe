import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
}

const BookingModal = ({ isOpen, onClose, roomName }: BookingModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Missing Required Fields",
        description: "Please provide both your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response= await fetch('https://kodai-cool-stay-vibe.onrender.com/send-booking', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, phone, message, })
            });
      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        toast({ title: "Booking Sent", description: result.message || "Your request was submitted successfully!" });

        setTimeout(() => {
          setName('');
          setPhone('');
          setMessage('');
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(result.message || 'Unknown error occurred');
      }
    } catch (err: any) {
      console.error("Booking Error:", err);
      toast({
        title: "Booking Failed",
        description: err.message || "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl animate-zoom-in">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-hotel-teal">Book {roomName}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your contact number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any special requests or questions?"
                  className="min-h-[100px]"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-hotel-teal hover:bg-hotel-teal/90"
                >
                  {isSubmitting ? "Processing..." : "Submit Booking Request"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center">
            <CheckCircle2 className="text-green-500 h-16 w-16 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
            <p className="text-center mb-6">We will contact you soon 😊</p>
            <Button onClick={onClose} className="bg-hotel-teal hover:bg-hotel-teal/90">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
