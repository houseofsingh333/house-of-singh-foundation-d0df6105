import { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  type ContactFormData,
  emptyFormData,
  buildSteps,
  STORAGE_KEY,
} from "@/lib/contact-form-data";
import StepRenderer from "@/components/contact/StepRenderer";
import { ReviewScreen, ConfirmationScreen } from "@/components/contact/ReviewConfirmation";
import InstagramFeed from "@/components/contact/InstagramFeed";

type Phase = "form" | "review" | "done";

/* ── Progress bar ──────────────────────────────────────── */
const ProgressBar = ({ percent }: { percent: number }) => (
  <div className="fixed top-0 left-0 w-full z-50">
    <div
      className="h-[2px] bg-foreground transition-all duration-500 ease-out"
      style={{ width: `${percent}%` }}
    />
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...emptyFormData, ...parsed };
      }
    } catch {}
    return emptyFormData;
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");
  const [returnToReview, setReturnToReview] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  // Draft restored toast
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.intent || parsed.name || parsed.email) {
          setHasDraft(true);
          toast("Draft restored", {
            description: "I saved your progress from last time.",
            duration: 3000,
          });
        }
      }
    } catch {}
  }, []);

  // Autosave
  useEffect(() => {
    if (phase === "done") return;
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData, phase]);

  const steps = useMemo(() => buildSteps(formData.intent), [formData.intent]);
  const currentStepDef = steps[currentStep];
  const currentValue = currentStepDef ? formData[currentStepDef.field] : "";

  const isValid = useCallback(() => {
    if (!currentStepDef) return false;
    if (!currentStepDef.required) return true;
    return !!formData[currentStepDef.field];
  }, [currentStepDef, formData]);

  const isSkippable = currentStepDef && !currentStepDef.required;

  const handleFieldChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!isValid() && !isSkippable) return;
    if (returnToReview) {
      setReturnToReview(false);
      setPhase("review");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setPhase("review");
    }
  }, [isValid, isSkippable, currentStep, steps.length, returnToReview]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const handleEditFromReview = useCallback((stepIndex: number) => {
    setReturnToReview(true);
    setCurrentStep(stepIndex);
    setPhase("form");
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("Contact submission:", formData);
    localStorage.removeItem(STORAGE_KEY);
    setPhase("done");
  }, [formData]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(emptyFormData);
    setCurrentStep(0);
    setHasDraft(false);
  }, []);

  // Auto-advance on intent selection
  useEffect(() => {
    if (currentStepDef?.type === "intent" && formData.intent) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 300);
      return () => clearTimeout(timer);
    }
  }, [formData.intent, currentStepDef?.type]);

  // Keyboard: Enter to advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase === "form" && currentStepDef?.type !== "textarea" && currentStepDef?.type !== "intent") {
        e.preventDefault();
        if (isValid() || isSkippable) handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, currentStepDef, isValid, isSkippable, handleNext]);

  // Progress
  const totalSteps = steps.length;
  const progressPercent = phase === "review" || phase === "done" ? 100 : ((currentStep + 1) / (totalSteps + 1)) * 100;

  /* ── Navigation buttons ── */
  const NavigationButtons = () => (
    <div className="flex items-center justify-between pt-16">
      <div>
        {currentStep > 0 && (
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isSkippable && (
          <button
            onClick={handleNext}
            className="text-sm tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-200"
          >
            Skip
          </button>
        )}
        {currentStepDef?.type !== "intent" && (
          <button
            onClick={handleNext}
            disabled={!isValid() && !isSkippable}
            className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? "Review" : "Continue"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );

  /* ── Left column content ── */
  const renderLeftColumn = () => {
    if (phase === "done") {
      return <ConfirmationScreen />;
    }

    if (phase === "review") {
      return (
        <ReviewScreen
          steps={steps}
          formData={formData}
          onEdit={handleEditFromReview}
          onSubmit={handleSubmit}
          onBack={() => {
            setCurrentStep(steps.length - 1);
            setPhase("form");
          }}
        />
      );
    }

    return (
      <div className="flex flex-col justify-center min-h-[60vh]">
        {/* Editorial intro — only on first visit */}
        <div className="mb-20">
          <h1 className="font-editorial text-4xl md:text-5xl font-light text-foreground mb-6 leading-[1.1]">
            Say hello.
          </h1>
          <div className="max-w-[32ch]">
            <p className="text-muted-foreground text-base leading-[1.8] mb-3">
              Whether it's a project, a collaboration, or simply a conversation, I'm always open to hearing from thoughtful people.
            </p>
            <p className="text-muted-foreground text-base leading-[1.8]">
              If you'd like to catch up over coffee, go for a walk, or explore an idea together, feel free to reach out.
            </p>
          </div>
        </div>

        {/* Form step */}
        <div key={currentStep} className="editorial-slide-up">
          <h2 className="font-editorial text-2xl md:text-3xl font-light text-foreground leading-[1.2] mb-2">
            {currentStepDef?.question}
          </h2>

          {currentStepDef?.helperText && (
            <p className="text-sm text-muted-foreground/70 mb-8">
              {currentStepDef.helperText}
            </p>
          )}

          <div className="mt-6">
            {currentStepDef && (
              <StepRenderer
                step={currentStepDef}
                value={currentValue}
                onChange={handleFieldChange}
              />
            )}
          </div>

          {currentStep === 0 && hasDraft && (
            <button
              onClick={clearDraft}
              className="mt-8 text-xs tracking-[0.15em] uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-200"
            >
              Clear saved progress
            </button>
          )}
        </div>

        <NavigationButtons />
      </div>
    );
  };

  return (
    <>
      <ProgressBar percent={progressPercent} />

      {/* Desktop: two columns — form left, image right */}
      <div className="min-h-[85vh] px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[5fr_4fr] gap-0 max-w-[1400px] mx-auto min-h-[70vh]">
          {/* Left — Form */}
          <div className="pr-0 md:pr-16 lg:pr-24">
            {renderLeftColumn()}
          </div>

          {/* Right — Instagram feed (hidden on mobile until after form) */}
          <div className="hidden md:block relative">
            <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-hidden">
              <InstagramFeed />
            </div>
          </div>
        </div>

        {/* Mobile: image after form */}
        <div className="block md:hidden mt-16">
          <div className="aspect-[3/4] max-h-[480px] overflow-hidden">
            <InstagramFeed />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
