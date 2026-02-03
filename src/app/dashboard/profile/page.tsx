
import { User, Mail, Phone, Lock } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Account Information</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-medium flex items-center gap-2" htmlFor="fullName">
                <User size={16} />
                Full Name
              </label>
              <input id="fullName" defaultValue="Admin User" className="w-full bg-secondary/50 p-2 rounded-lg border focus:border-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-medium flex items-center gap-2" htmlFor="email">
                <Mail size={16} />
                Email Address
              </label>
              <input id="email" type="email" defaultValue="admin@commercepulse.com" className="w-full bg-secondary/50 p-2 rounded-lg border focus:border-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-medium flex items-center gap-2" htmlFor="phone">
                <Phone size={16} />
                Phone Number
              </label>
              <input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="w-full bg-secondary/50 p-2 rounded-lg border focus:border-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="font-medium flex items-center gap-2" htmlFor="role">
                Role
              </label>
              <input id="role" defaultValue="Administrator" disabled className="w-full bg-secondary/50 p-2 rounded-lg border focus:border-primary transition-colors cursor-not-allowed" />
            </div>
          </div>

          <h3 className="text-lg font-semibold pt-6 border-t mt-8">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-medium flex items-center gap-2" htmlFor="currentPassword">
                  <Lock size={16} />
                  Current Password
                </label>
                <input id="currentPassword" type="password" className="w-full bg-secondary/50 p-2 rounded-lg border focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="font-medium flex items-center gap-2" htmlFor="newPassword">
                  <Lock size={16} />
                  New Password
                </label>
                <input id="newPassword" type="password" className="w-full bg-secondary/50 p-2 rounded-lg border focus:border-primary transition-colors" />
              </div>
          </div>
          
          <div className="flex justify-end pt-6 border-t mt-8">
            <button type="submit" className="bg-primary text-primary-foreground py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
