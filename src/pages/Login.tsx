import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Activity } from 'lucide-react';

const Login = () => {
  const [abhaId, setAbhaId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check hardcoded credentials
    if (abhaId === '1234-5678-9012' && password === 'demo123') {
      // Generate random OTP and store it
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('demoOtp', otp);
      sessionStorage.setItem('abhaId', abhaId);
      
      toast({
        title: "Login Successful",
        description: `OTP sent successfully. Demo OTP: ${otp}`,
      });
      
      navigate('/otp-verification');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid ABHA ID or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              Doctor Login
            </CardTitle>
            <CardDescription className="text-base">
              NAMASTE ↔ ICD-11 Terminology System
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="abhaId">ABHA ID</Label>
              <Input
                id="abhaId"
                type="text"
                placeholder="Enter ABHA ID"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Login"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-medical-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Demo Credentials:</strong><br />
              ABHA ID: 1234-5678-9012<br />
              Password: demo123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;