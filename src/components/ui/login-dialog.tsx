import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Download, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "./alert";

interface LoginDialogProps {
  children: React.ReactNode;
}

const API_ENDPOINT = "/api/register";


interface FactoryRegistrationData {
  factory_name: string;
  db_name: string;
  admin_username: string;
  admin_password: string;
  admin_name: string;
  admin_email: string;
}

export function LoginDialog({ children }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!API_ENDPOINT) {
      toast({
        title: "Missing configuration",
        description: "VITE_BACKEND_URL is not set. Please configure it in your environment.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const registrationData: FactoryRegistrationData = {
      factory_name: formData.get("factory_name") as string,
      db_name: formData.get("db_name") as string,
      admin_username: formData.get("admin_username") as string,
      admin_password: formData.get("admin_password") as string,
      admin_name: formData.get("admin_name") as string,
      admin_email: formData.get("admin_email") as string,
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationResponse(data);
        setShowInstructions(true);
        
        toast({
          title: "Factory Registered Successfully!",
          description: "Read the guide below. When ready, click the download button to open the link.",
          duration: 5000,
        });
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (registrationResponse?.download_info?.app_download_url) {
      window.open(registrationResponse.download_info.app_download_url, "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Your Factory</DialogTitle>
          <DialogDescription>
            Set up your go-to ims by Basic Tech
          </DialogDescription>
        </DialogHeader>
        
        {!showInstructions ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="factory_name">Factory Name</Label>
              <Input 
                id="factory_name"
                name="factory_name"
                type="text" 
                placeholder="e.g., Bright Plastics"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db_name">Database Name</Label>
              <Input 
                id="db_name"
                name="db_name"
                type="text" 
                placeholder="e.g., bright_plastics_db"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_username">Admin Username</Label>
              <Input 
                id="admin_username"
                name="admin_username"
                type="text" 
                placeholder="e.g., master"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_password">Admin Password</Label>
              <div className="relative">
                <Input 
                  id="admin_password"
                  name="admin_password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  required 
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_name">Admin Full Name</Label>
              <Input 
                id="admin_name"
                name="admin_name"
                type="text" 
                placeholder="e.g., Anita Shah"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin_email">Admin Email</Label>
              <Input 
                id="admin_email"
                name="admin_email"
                type="email" 
                placeholder="e.g., anita@brightplastics.in"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Registering Factory..." : "Register"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Factory registered successfully! Please review the guide below. When you're ready, open the download link.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-semibold">Login Instructions:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Username:</strong> {registrationResponse?.login_instructions?.username}</p>
                  <p><strong>Factory:</strong> {registrationResponse?.factory?.factory_name}</p>
                  <p><strong>Database:</strong> {registrationResponse?.factory?.db_name}</p>
                  <p><strong>Your Role:</strong> {registrationResponse?.admin_user?.role}</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-semibold">Connection Info:</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Max Connections:</strong> {registrationResponse?.connection_info?.max_connections}</p>
                  <p><strong>Current Users:</strong> {registrationResponse?.connection_info?.initial_users}</p>
                  <p className="text-muted-foreground">{registrationResponse?.connection_info?.note}</p>
                </div>
              </div>

              <Button 
                onClick={handleDownload}
                className="w-full"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Open Download Link
              </Button>

              <Button 
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}