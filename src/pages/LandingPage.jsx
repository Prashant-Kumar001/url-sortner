import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

const LandingPage = () => {
  const { loading, isAuthenticated, Local_loading } = useAuth();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();


  const handleShorten = () => {
    if (!url) return toast.error("Please enter a valid URL.");
    navigate(`/auth?create=true&url=${url}`);
  };

  return (
    <div className="space-y-20">
      <section className="text-center space-y-6 py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Shorten Your Links ⚡
        </h1>

        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Create clean, trackable, and powerful short links in seconds. Perfect
          for developers, marketers, and creators.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
          <Input
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 text-base"
          />
          <Button
            variant="destructive"
            onClick={handleShorten}
            className="h-12 px-6"
          >
            Shorten
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 rounded-xl border bg-white dark:bg-gray-900">
          <h3 className="font-semibold text-lg">⚡ Fast</h3>
          <p className="text-sm text-gray-500 mt-2">
            Generate links instantly with blazing speed.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white dark:bg-gray-900">
          <h3 className="font-semibold text-lg">📊 Analytics</h3>
          <p className="text-sm text-gray-500 mt-2">
            Track clicks and user engagement easily.
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white dark:bg-gray-900">
          <h3 className="font-semibold text-lg">🔒 Secure</h3>
          <p className="text-sm text-gray-500 mt-2">
            Your links are safe and reliable.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is a URL shortener?</AccordionTrigger>
            <AccordionContent>
              A URL shortener converts long links into shorter, shareable ones.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, basic features are completely free.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I track clicks?</AccordionTrigger>
            <AccordionContent>
              Yes, you can view analytics for each shortened link.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold">Start shortening links today 🚀</h2>

        {!isAuthenticated ? (
          <Button
            variant="destructive"
            onClick={handleShorten}
            className="h-12 px-6 mt-6"
          >
            Get started
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="h-12 px-6 mt-6"
          >
            Go to dashboard
          </Button>
        )}
      </section>
      {(Local_loading || loading) && (
        <div className="fixed flex justify-center items-center top-0 left-0 opacity-70 w-full h-screen bg-black/25 z-50 ">
          <ClipLoader className="z-100 opacity-100" size={40} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
