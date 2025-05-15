import Navbar from "@/components/Navbar";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div>
        <Navbar/>
      <div className="flex-1 flex justify-center items-center">
        <SignUpForm />
      </div>
    </div>
  );
}
