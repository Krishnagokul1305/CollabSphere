import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Spinner from "./Spinner";

const REGEXP_ONLY_DIGITS_AND_CHARS = /^[0-9a-zA-Z]+$/;

export function OtpModal({ open, onClose, onVerify, loading }) {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Verification Code</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the 6-digit OTP sent to your registered email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={otp.length < 6 || loading}
          >
            {loading ? <Spinner /> : " Verify OTP"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
