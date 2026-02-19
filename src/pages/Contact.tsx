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

type Phase = "form" | "review" | "done";

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

  // Show draft restored toast on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.intent || parsed.name || parsed.email) {
          setHasDraft(true);
          toast("Draft restored", {
            description: "We saved your progress from last time.",
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

    // Auto-advance for intent selection
    if (currentStepDef?.type === "intent" && formData[currentStepDef.field]) {
      // Reset step to re-evaluate steps array after intent change
    }

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
  }, [isValid, isSkippable, currentStep, steps.length, returnToReview, currentStepDef, formData]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
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
      const timer = setTimeout(() => {
        setCurrentStep((s) => s + 1);
      }, 300);
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
  const progressPercent = phase === "review" ? 100 : phase === "done" ? 100 : ((currentStep + 1) / (totalSteps + 1)) * 100;

  // Confirmation
  if (phase === "done") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <ConfirmationScreen />
      </div>
    );
  }

  // Review
  if (phase === "review") {
    return (
      <div className="min-h-[80vh] flex flex-col px-6 py-16 md:py-24">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <div
            className="h-[2px] bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex-1 flex items-start justify-center pt-8 md:pt-16">
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
        </div>
      </div>
    );
  }

  // Form steps
  return (
    <div className="min-h-[80vh] flex flex-col px-6 md:px-8 py-16 md:py-24">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div
          className="h-[2px] bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main content — centered single column */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xl" key={currentStep}>
          <div className="editorial-slide-up">
            {/* Step label */}
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
              Step {currentStep + 1} of {totalSteps}
            </p>

            {/* Question */}
            <h2 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.15] mb-4">
              {currentStepDef?.question}
            </h2>

            {/* Helper text */}
            {currentStepDef?.helperText && (
              <p className="text-sm text-muted-foreground mb-8">
                {currentStepDef.helperText}
              </p>
            )}

            {/* Input */}
            <div className="mt-8">
              {currentStepDef && (
                <StepRenderer
                  step={currentStepDef}
                  value={currentValue}
                  onChange={handleFieldChange}
                />
              )}
            </div>

            {/* Clear draft link on first step */}
            {currentStep === 0 && hasDraft && (
              <button
                onClick={clearDraft}
                className="mt-6 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Clear saved progress
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8">
        <div>
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground border border-border rounded-full transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSkippable && (
            <button
              onClick={handleNext}
              className="px-5 py-3 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Skip
            </button>
          )}
          {currentStepDef?.type !== "intent" && (
            <button
              onClick={handleNext}
              disabled={!isValid() && !isSkippable}
              className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {currentStep === steps.length - 1 ? "Review" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
