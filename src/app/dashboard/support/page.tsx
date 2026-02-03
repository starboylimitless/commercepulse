
import { LifeBuoy, MessageSquare, ShieldCheck } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <LifeBuoy size={48} className="text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Help Center</h2>
          <p className="text-muted-foreground mb-4">Find answers to common questions and learn how to use Pulse.</p>
          <button className="mt-auto w-full bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/90 transition-colors">Browse Articles</button>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <MessageSquare size={48} className="text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-muted-foreground mb-4">Get in touch with our support team for personalized assistance.</p>
          <button className="mt-auto w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors">Send a Message</button>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <ShieldCheck size={48} className="text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">System Status</h2>
          <p className="text-muted-foreground mb-4">Check the current status of our services and subscribe to updates.</p>
          <button className="mt-auto w-full bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/90 transition-colors">View Status Page</button>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">How does the AI Forecast work?</h3>
            <p className="text-muted-foreground">Our AI analyzes historical sales data and market trends to predict future demand for your products, helping you optimize inventory and marketing strategies.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I customize the dashboard?</h3>
            <p className="text-muted-foreground">Currently, the dashboard has a fixed layout, but we are working on introducing customization options in a future update.</p>
          </div>
          <div>
            <h3 className="font-semibold">Is my data secure?</h3>
            <p className="text-muted-foreground">Yes, we take data security very seriously. All your data is encrypted and stored in secure servers. You can read more in our privacy policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
