"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { Sparkles, Network, Users, Cloud, CheckCircle2, XCircle, FileText } from "lucide-react"

const KnowledgeGraph = dynamic(() => import("@/components/knowledge-graph"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-slate-400">در حال بارگذاری نمودار...</div>
    </div>
  ),
})

export default function ResearchPlatformDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return

      const steps = scrollContainerRef.current.querySelectorAll(".step")
      const windowHeight = window.innerHeight

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect()
        const stepTop = rect.top
        const stepHeight = rect.height

        if (stepTop < windowHeight / 2 && stepTop + stepHeight > windowHeight / 2) {
          setCurrentStep(index)
        }
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      handleScroll()

      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* Sticky Stage - Left Side */}
        <div className="hidden lg:flex items-center justify-center p-8 sticky top-0 h-screen">
          <StageView currentStep={currentStep} />
        </div>

        {/* Scrolling Narrative - Right Side */}
        <div ref={scrollContainerRef} className="h-screen overflow-y-auto" dir="rtl">
          <div className="py-[50vh] px-4 lg:px-12 space-y-[90vh]">
            <Step
              index={0}
              active={currentStep === 0}
              tag="معرفی محصول"
              title="سامانه هوشمند پژوهش"
              description="پلتفرمی نوین برای پژوهشگران که با هوش مصنوعی، فرآیند تحقیق و نگارش را متحول می‌کند."
            />

            <Step
              index={1}
              active={currentStep === 1}
              tag="دستیار هوشمند"
              title="تحریر با سرعت اندیشه"
              description="هوش مصنوعی با درک متون، ادامه جمله شما را پیشنهاد می‌دهد. با یک کلیک تأیید کنید."
            />

            <Step
              index={2}
              active={currentStep === 2}
              tag="تصحیح هوشمند"
              title="ویرایش لحظه‌ای با هوش مصنوعی"
              description="متن را انتخاب کنید تا هوش مصنوعی بهترین بازنویسی را پیشنهاد دهد."
            />

            <Step
              index={3}
              active={currentStep === 3}
              tag="نمودار دانش"
              title="کشف الگوهای پنهان"
              description="ارتباط میان نویسندگان و کتاب‌ها را به صورت بصری ببینید و الگوهای جدید کشف کنید."
            />

            <Step
              index={4}
              active={currentStep === 4}
              tag="همکاری تیمی"
              title="تحقیق گروهی در زمان واقعی"
              description="همزمان با تیم خود روی یک سند کار کنید و تغییرات را لحظه به لحظه ببینید."
            />

            <Step
              index={5}
              active={currentStep === 5}
              tag="مدیریت نسخه‌ها"
              title="بازگشت به هر مرحله از تحقیق"
              description="تمام تغییرات ذخیره می‌شود و می‌توانید به راحتی به نسخه‌های قبلی برگردید."
            />

            <Step
              index={6}
              active={currentStep === 6}
              tag="ذخیره امن"
              title="داده‌ها همیشه در امان"
              description="تمام اسناد شما به صورت خودکار و امن در فضای ابری ذخیره می‌شوند."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Step({
  index,
  active,
  tag,
  title,
  description,
}: {
  index: number
  active: boolean
  tag: string
  title: string
  description: string
}) {
  return (
    <div
      className={`step transition-all duration-500 ${
        active ? "opacity-100 translate-y-0" : "opacity-30 translate-y-5"
      }`}
      data-index={index}
    >
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 border border-slate-200/60 shadow-xl max-w-lg">
        <span className="text-sm font-bold text-teal-600 mb-2 inline-flex items-center gap-2">{tag}</span>
        <h2 className="text-3xl font-bold mb-4 leading-tight text-slate-900">{title}</h2>
        <p className="text-lg text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function StageView({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full max-w-3xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200/60">
      {currentStep === 0 && <IntroScene />}
      {currentStep === 1 && <GhostWriterScene />}
      {currentStep === 2 && <ModifierScene />}
      {currentStep === 3 && <GraphScene />}
      {currentStep === 4 && <CollaborationScene />}
      {currentStep === 5 && <HistoryScene />}
      {currentStep === 6 && <CloudScene />}
    </div>
  )
}

function IntroScene() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%232C7A7B' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-bounce relative z-10">
        <span className="text-4xl">📚</span>
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">سامانه هوشمند پژوهش</h1>

      <div className="w-12 h-1 bg-teal-600 rounded-full mb-4"></div>

      <p className="text-lg text-slate-600 text-center max-w-md mb-8 leading-relaxed">
        پلتفرمی نوین برای پژوهشگران علوم دینی با قدرت هوش مصنوعی
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <FeaturePill icon={<Sparkles className="w-4 h-4" />} text="هوش مصنوعی" />
        <FeaturePill icon={<Users className="w-4 h-4" />} text="همکاری تیمی" />
        <FeaturePill icon={<Network className="w-4 h-4" />} text="نمودار دانش" />
        <FeaturePill icon={<Cloud className="w-4 h-4" />} text="ذخیره ابری" />
      </div>
    </div>
  )
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-white px-4 py-2 rounded-full text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
      <span className="text-teal-600">{icon}</span>
      <span className="text-slate-700">{text}</span>
    </div>
  )
}

function EditorHeader({ title, users }: { title: string; users?: string[] }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50" dir="rtl">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-sm font-medium text-slate-600">{title}</span>
      {users && (
        <div className="flex -space-x-2 space-x-reverse">
          {users.map((user, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs border-2 border-white"
            >
              {user[0]}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function GhostWriterScene() {
  const [typedText, setTypedText] = useState("")
  const [ghostText, setGhostText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [cursorBlink, setCursorBlink] = useState(true)
  const [phase, setPhase] = useState<"typing" | "waiting" | "ghost">("typing")

  const baseText = "در بررسی روایات مربوط به این موضوع می‌توان گفت که"
  const ghostSuggestion = " سند این روایت معتبر بوده و راویان آن ثقه هستند..."

  useEffect(() => {
    // Phase 1: Type the base text
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex < baseText.length) {
        setTypedText(baseText.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setPhase("waiting")
      }
    }, 60)

    return () => clearInterval(typeInterval)
  }, [])

  useEffect(() => {
    if (phase === "waiting") {
      // Phase 2: Blink cursor while "thinking"
      const blinkInterval = setInterval(() => {
        setCursorBlink((prev) => !prev)
      }, 400)

      const waitTimeout = setTimeout(() => {
        clearInterval(blinkInterval)
        setCursorBlink(true)
        setPhase("ghost")
      }, 2000)

      return () => {
        clearInterval(blinkInterval)
        clearTimeout(waitTimeout)
      }
    }
  }, [phase])

  useEffect(() => {
    if (phase === "ghost") {
      // Phase 3: Show ghost text gradually
      let ghostIndex = 0
      const ghostInterval = setInterval(() => {
        if (ghostIndex < ghostSuggestion.length) {
          setGhostText(ghostSuggestion.slice(0, ghostIndex + 1))
          ghostIndex++
        } else {
          clearInterval(ghostInterval)
          setShowCursor(false)
        }
      }, 40)

      return () => clearInterval(ghostInterval)
    }
  }, [phase])

  return (
    <div className="w-full h-full flex flex-col" dir="rtl">
      <EditorHeader title="پژوهش جدید" />
      <div className="flex-1 p-8 lg:p-12 bg-white">
        <div className="prose prose-lg max-w-none text-right">
          <p className="text-slate-900 text-xl leading-loose inline">
            {typedText}
            {showCursor && (
              <span
                className={`inline-block w-0.5 h-6 bg-teal-600 mx-0.5 align-middle transition-opacity duration-100 ${
                  cursorBlink ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            <span className="text-slate-400/70 italic">{ghostText}</span>
          </p>
        </div>

        {ghostText.length > 10 && (
          <div className="mt-6 flex items-center gap-2 animate-fadeIn">
            <span className="text-sm text-slate-500">Tab را بزنید برای تأیید</span>
            <kbd className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 border border-slate-200">Tab</kbd>
          </div>
        )}
      </div>
    </div>
  )
}

function ModifierScene() {
  const [phase, setPhase] = useState<"idle" | "selecting" | "typing" | "modified" | "actions">("idle")
  const [commandText, setCommandText] = useState("")
  const [showModification, setShowModification] = useState(false)

  const command = "تبدیل به سبک رسمی"

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Phase 1: Show selection
    timers.push(setTimeout(() => setPhase("selecting"), 500))

    // Phase 2: Type command
    timers.push(
      setTimeout(() => {
        setPhase("typing")
        let i = 0
        const typeInterval = setInterval(() => {
          if (i < command.length) {
            setCommandText(command.slice(0, i + 1))
            i++
          } else {
            clearInterval(typeInterval)
          }
        }, 60)
      }, 1500),
    )

    // Phase 3: Show modification
    timers.push(
      setTimeout(() => {
        setShowModification(true)
        setPhase("modified")
      }, 3500),
    )

    // Phase 4: Show action buttons
    timers.push(setTimeout(() => setPhase("actions"), 4000))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="w-full h-full flex flex-col relative" dir="rtl">
      <EditorHeader title="ویرایش متن" />
      <div className="flex-1 flex">
        {/* Main editor area */}
        <div className="flex-1 p-8 lg:p-12 bg-white">
          <div className="prose prose-lg max-w-none text-right">
            <p className="text-slate-900 text-xl leading-loose">
              {"این مطلب "}
              <span
                className={`transition-all duration-300 ${
                  phase !== "idle" && !showModification
                    ? "bg-teal-100 rounded px-1 ring-2 ring-teal-300"
                    : showModification
                      ? "line-through text-slate-400"
                      : ""
                }`}
              >
                خیلی مهم است
              </span>
              {showModification && (
                <span className="bg-green-100 text-green-800 rounded px-1 mr-2 animate-fadeIn">
                  از اهمیت بسزایی برخوردار است
                </span>
              )}
              {" و باید به آن توجه کنیم."}
            </p>
          </div>

          {/* Command input at bottom */}
          {phase === "typing" && (
            <div className="absolute bottom-8 right-8 bg-slate-900 text-white rounded-lg px-4 py-3 flex items-center gap-2 animate-fadeIn shadow-xl">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="font-mono text-sm">{commandText}</span>
              <span className="w-0.5 h-4 bg-white animate-pulse" />
            </div>
          )}
        </div>

        {/* Side panel for accept/reject - appears after modification */}
        {phase === "actions" && (
          <div className="w-56 border-r border-slate-200 bg-slate-50 p-4 flex flex-col gap-3 animate-slideIn">
            <div className="text-sm font-medium text-slate-700 mb-2">پیشنهاد هوش مصنوعی</div>
            <button className="w-full bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-md">
              <CheckCircle2 className="w-5 h-5" />
              <span>تأیید تغییرات</span>
            </button>
            <button className="w-full bg-white text-slate-600 px-4 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <XCircle className="w-5 h-5" />
              <span>رد کردن</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function GraphScene() {
  return (
    <div className="w-full h-full flex flex-col bg-slate-50">
      <div className="p-4 border-b border-slate-200 bg-white" dir="rtl">
        <h3 className="text-lg font-semibold text-slate-900">نمودار دانش پژوهشی</h3>
        <p className="text-sm text-slate-600 mt-1">ارتباط میان کتب اربعه و مؤلفان آنها - قابل تعامل و بزرگنمایی</p>
      </div>
      <div className="flex-1 relative">
        <KnowledgeGraph />
      </div>
    </div>
  )
}

function CollaborationScene() {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [cursor1Visible, setCursor1Visible] = useState(true)
  const [cursor2Visible, setCursor2Visible] = useState(true)

  const user1Text = "در این پژوهش به بررسی دیدگاه‌های مختلف"
  const user2Text = "نقاط مشترک و اختلاف را تحلیل می‌کنیم"

  useEffect(() => {
    // User 1 typing
    let i1 = 0
    const interval1 = setInterval(() => {
      if (i1 < user1Text.length) {
        setText1(user1Text.slice(0, i1 + 1))
        i1++
      } else {
        clearInterval(interval1)
      }
    }, 80)

    // User 2 typing (starts slightly delayed)
    const timeout2 = setTimeout(() => {
      let i2 = 0
      const interval2 = setInterval(() => {
        if (i2 < user2Text.length) {
          setText2(user2Text.slice(0, i2 + 1))
          i2++
        } else {
          clearInterval(interval2)
        }
      }, 100)
    }, 800)

    // Cursor blinking
    const blinkInterval = setInterval(() => {
      setCursor1Visible((v) => !v)
      setCursor2Visible((v) => !v)
    }, 530)

    return () => {
      clearInterval(interval1)
      clearTimeout(timeout2)
      clearInterval(blinkInterval)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col" dir="rtl">
      <EditorHeader title="پژوهش مشترک" users={["علی", "زهرا"]} />
      <div className="flex-1 p-8 lg:p-12 bg-white">
        <div className="prose prose-lg max-w-none text-right space-y-6">
          {/* User 1's line */}
          <div className="relative">
            <div className="absolute -right-6 top-0 w-1 h-full rounded" style={{ backgroundColor: "#3b82f6" }} />
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                ع
              </div>
              <span className="text-xs text-blue-600">علی</span>
            </div>
            <p className="text-slate-900 text-xl leading-loose inline">
              {text1}
              <span
                className={`inline-block w-0.5 h-6 bg-blue-500 mx-0.5 align-middle transition-opacity duration-100 ${
                  cursor1Visible ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          </div>

          {/* User 2's line */}
          <div className="relative">
            <div className="absolute -right-6 top-0 w-1 h-full rounded" style={{ backgroundColor: "#10b981" }} />
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">
                ز
              </div>
              <span className="text-xs text-emerald-600">زهرا</span>
            </div>
            <p className="text-slate-900 text-xl leading-loose inline">
              {text2}
              <span
                className={`inline-block w-0.5 h-6 bg-emerald-500 mx-0.5 align-middle transition-opacity duration-100 ${
                  cursor2Visible ? "opacity-100" : "opacity-0"
                }`}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HistoryScene() {
  const [activeStep, setActiveStep] = useState(0)

  const versions = [
    { id: 1, message: "ایجاد سند جدید", lines: 2 },
    { id: 2, message: "نوشتن مقدمه فصل اول", lines: 4 },
    { id: 3, message: "تصحیح و سند گذاری روایات فصل دوم", lines: 6 },
    { id: 4, message: "افزودن نتیجه‌گیری", lines: 8 },
    { id: 5, message: "ویرایش نهایی", lines: 10 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % versions.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col" dir="rtl">
      <EditorHeader title="تاریخچه تغییرات" />
      <div className="flex-1 flex bg-white">
        {/* Timeline */}
        <div className="w-72 border-l border-slate-200 p-4 bg-slate-50 overflow-auto">
          <h4 className="text-sm font-semibold text-slate-700 mb-4">نسخه‌های قبلی</h4>
          <div className="space-y-3">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`relative flex gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  index === activeStep
                    ? "bg-teal-50 border-2 border-teal-500"
                    : index < activeStep
                      ? "bg-white border border-slate-200"
                      : "bg-slate-100 border border-slate-200 opacity-50"
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Connection line */}
                {index < versions.length - 1 && <div className="absolute top-full right-6 w-0.5 h-3 bg-slate-300" />}
                {/* Dot */}
                <div
                  className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 transition-colors ${
                    index === activeStep ? "bg-teal-500" : index < activeStep ? "bg-slate-400" : "bg-slate-300"
                  }`}
                />
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{version.message}</p>
                  <p className="text-xs text-slate-500 mt-0.5">نسخه {version.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document preview */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-48 bg-white rounded-lg shadow-xl border border-slate-200 p-4 transition-all duration-500">
            {/* Document sketch */}
            <div className="space-y-2">
              {Array.from({ length: versions[activeStep].lines }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded transition-all duration-300 ${
                    i < versions[activeStep].lines - 2 ? "bg-slate-200" : "bg-teal-200"
                  }`}
                  style={{
                    width: `${70 + Math.random() * 30}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-500 text-center">{versions[activeStep].message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CloudScene() {
  const [files, setFiles] = useState<Array<{ name: string; progress: number }>>([])

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFiles([{ name: "پژوهش_فقهی.docx", progress: 0 }])
    }, 500)

    const timer2 = setTimeout(() => {
      setFiles((prev) => [...prev, { name: "منابع_روایی.pdf", progress: 0 }])
    }, 1000)

    const timer3 = setTimeout(() => {
      setFiles((prev) => [...prev, { name: "یادداشت‌ها.txt", progress: 0 }])
    }, 1500)

    const progressInterval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => ({
          ...file,
          progress: Math.min(file.progress + 10, 100),
        })),
      )
    }, 200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-12">
      <div className="relative mb-8 animate-bounce">
        <Cloud className="w-24 h-24 text-teal-600" strokeWidth={1.5} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-2">ذخیره امن در فضای ابری</h3>
      <p className="text-slate-600 mb-8">تمام اسناد شما به صورت خودکار ذخیره می‌شوند</p>

      <div className="w-full max-w-md space-y-3" dir="rtl">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md flex items-center gap-3 animate-fadeIn"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{file.name}</p>
              <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-200"
                  style={{ width: `${file.progress}%` }}
                />
              </div>
            </div>
            {file.progress === 100 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          </div>
        ))}
      </div>
    </div>
  )
}
