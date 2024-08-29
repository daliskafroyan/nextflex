import SignUpForm from "@/modules/authentication/sign-up/sign-up.form";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <section className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="flex items-center justify-center py-12 relative">
        <SignUpForm />
      </div>
      <div className="hidden lg:block">
        <Image
          src="/auth-banner.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ objectFit: 'cover', overflow: 'hidden' }}
        />
      </div>
    </section>
  );
}
