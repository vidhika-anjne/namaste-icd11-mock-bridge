import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { Shield, ArrowLeft } from 'lucide-react';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoOtp, setDemoOtp] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get stored OTP and ABHA ID
    const storedOtp = sessionStorage.getItem('demoOtp');
    const storedAbhaId = sessionStorage.getItem('abhaId');
    
    if (!storedOtp || !storedAbhaId) {
      navigate('/login');
      return;
    }
    
    setDemoOtp(storedOtp);
    setAbhaId(storedAbhaId);
  }, [navigate]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otp === demoOtp) {
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.removeItem('demoOtp');
      
      toast({
        title: "OTP Verified",
        description: "Login successful. Redirecting to dashboard...",
      });
      
      navigate('/dashboard');
    } else {
      toast({
        title: "Verification Failed", 
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      });
      setOtp('');
    }
    
    setIsLoading(false);
  };

  const handleResendOtp = () => {
    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('demoOtp', newOtp);
    setDemoOtp(newOtp);
    setOtp('');
    
    toast({
      title: "OTP Resent",
      description: `New demo OTP: ${newOtp}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-medical-light/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
            <CardDescription className="text-base">
              Enter the 6-digit OTP sent to your registered device
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                ABHA ID: <span className="font-medium text-foreground">{abhaId}</span>
              </p>
            </div>
            
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button 
            onClick={handleVerifyOtp}
            className="w-full h-12 text-base font-medium"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center space-y-3">
            <Button
              variant="ghost"
              onClick={handleResendOtp}
              className="text-sm text-medical-primary hover:text-medical-primary/80"
            >
              Resend OTP
            </Button>
          </div>
          
          {demoOtp && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-medical-border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Demo OTP:</strong> {demoOtp}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpVerification;