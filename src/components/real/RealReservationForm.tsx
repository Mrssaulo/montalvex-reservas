"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  CalendarDays,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquareText,
  Phone,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

type RealReservationFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  error?: string;
  slots: string[];
  today: string;
  primary: string;
  accent: string;
  openingTime: string;
  closingTime: string;
  lastReservationTime: string;
};

const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

const weekdayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

export function RealReservationForm({
  action,
  error,
  slots,
  today,
  primary,
  accent,
  openingTime,
  closingTime,
  lastReservationTime,
}: RealReservationFormProps) {
  const initialTime = slots[3] ?? slots[0] ?? "";
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => monthStart(today));
  const days = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const missingFields = [
    customerName.trim() ? null : "nome",
    customerPhone.trim() ? null : "telefone",
    selectedDate ? null : "data",
    selectedTime ? null : "horário",
  ].filter(Boolean);
  const canSubmit = missingFields.length === 0;

  return (
    <form action={action} className="space-y-4 p-4 sm:p-5">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-[#E8E2D4] bg-[#F5F1E8] p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex min-w-0 items-start gap-3">
          <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: primary }} />
          <p className="text-sm leading-6 text-[#6B7280]">
            Escolha data e horário. Sua solicitação será analisada pela equipe conforme disponibilidade do salão.
          </p>
        </div>
        <p className="mt-3 rounded-xl bg-white/70 p-3 text-xs font-bold leading-5 text-[#6B7280]">
          Horários com alta demanda podem depender de confirmação. A confirmação depende da disponibilidade do salão.
        </p>
      </div>

      <div className="grid gap-4">
        <Field label="Nome completo" icon={UserRound}>
          <input
            required
            name="customer_name"
            type="text"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="w-full bg-transparent py-1 text-base font-semibold outline-none"
            placeholder="Como podemos te chamar?"
          />
        </Field>

        <Field label="Telefone para contato" icon={Phone}>
          <input
            required
            name="customer_phone"
            type="tel"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            className="w-full bg-transparent py-1 text-base font-semibold outline-none"
            placeholder="(11) 99999-9999"
          />
          <p className="mt-2 text-xs font-semibold leading-5 text-[#64748B]">
            Usaremos este número para identificar sua reserva e avisar sobre a confirmação.
          </p>
        </Field>
      </div>

      <div className="grid min-w-0 items-start gap-3 sm:grid-cols-2">
        <Field label="Pessoas" icon={Users}>
          <input
            required
            name="people"
            type="number"
            min="1"
            max="60"
            defaultValue="2"
            className="w-full bg-transparent py-1 text-base font-semibold outline-none"
          />
        </Field>

        <Field label="Data" icon={CalendarDays}>
          <input type="hidden" name="reservation_date" value={selectedDate} />
          <button
            type="button"
            onClick={() => setCalendarOpen((current) => !current)}
            className="flex min-h-10 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-[#E8E2D4] bg-[#FDFBF7] px-3 py-2 text-left text-sm font-black transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5F1E8] hover:shadow-sm"
            aria-expanded={calendarOpen}
          >
            <span className="min-w-0 break-words">{formatDisplayDate(selectedDate)}</span>
            <CalendarDays className="h-4 w-4" style={{ color: primary }} />
          </button>
        </Field>
      </div>

      {calendarOpen ? (
        <CalendarPicker
          today={today}
          selectedDate={selectedDate}
          visibleMonth={visibleMonth}
          days={days}
          primary={primary}
          onSelectDate={(date) => {
            setSelectedDate(date);
            setCalendarOpen(false);
          }}
          onPreviousMonth={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          onNextMonth={() => setVisibleMonth(addMonths(visibleMonth, 1))}
        />
      ) : null}

      <Field label="Horário" icon={Clock}>
        <input required type="hidden" name="reservation_time" value={selectedTime} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {slots.map((time) => {
            const selected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedTime(time)}
                className={`time-slot min-h-12 rounded-xl border px-2 text-sm font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  selected ? "selected scale-[1.02] shadow-lg" : "bg-white hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-sm"
                }`}
                style={{ borderColor: selected ? primary : "#E8E2D4" }}
              >
                {time}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs font-semibold text-[#6B7280]">
          Horário selecionado: <span style={{ color: primary }}>{selectedTime || "nenhum"}</span>
        </p>
        <p className="mt-1 text-xs font-semibold text-[#6B7280]">
          Atendimento das {openingTime} às {closingTime}. Última reserva às {lastReservationTime}.
        </p>
      </Field>

      <Field label="Observações" icon={MessageSquareText}>
        <textarea
          name="notes"
          rows={3}
          className="w-full resize-none bg-transparent py-1 text-sm outline-none"
          placeholder="Aniversário, restrições alimentares, preferência de mesa..."
        />
      </Field>

      {!canSubmit ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold leading-5 text-amber-900">
          Preencha {formatMissingFields(missingFields)} para solicitar a reserva.
        </p>
      ) : null}

      <SubmitButton accent={accent} disabled={!canSubmit} />
    </form>
  );
}

function CalendarPicker({
  today,
  selectedDate,
  visibleMonth,
  days,
  primary,
  onSelectDate,
  onPreviousMonth,
  onNextMonth,
}: {
  today: string;
  selectedDate: string;
  visibleMonth: Date;
  days: Array<{ date: string; day: number | null }>;
  primary: string;
  onSelectDate: (date: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}) {
  const canGoBack = formatDate(addMonths(visibleMonth, -1)) >= formatDate(monthStart(today));

  return (
    <div className="animate-fade-in min-w-0 rounded-2xl border border-[#E8E2D4] bg-white p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onPreviousMonth}
          disabled={!canGoBack}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E2D4] bg-white text-[#1F2937] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5F1E8] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-center text-sm font-black capitalize" style={{ color: primary }}>
          {monthFormatter.format(visibleMonth)}
        </p>
        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8E2D4] bg-white text-[#1F2937] transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5F1E8] hover:shadow-sm"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-black text-[#6B7280]">
        {weekdayLabels.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day.day) {
            return <span key={`empty-${index}`} className="h-10" />;
          }

          const disabled = day.date < today;
          const selected = day.date === selectedDate;

          return (
            <button
              key={day.date}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(day.date)}
              className={`flex h-10 items-center justify-center rounded-xl text-sm font-black transition duration-200 ${
                selected
                  ? "scale-[1.04] text-white shadow-lg"
                  : "bg-white text-[#1F2937] hover:-translate-y-0.5 hover:bg-[#F5F1E8] hover:shadow-sm"
              } disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[#C7BFAF] disabled:hover:translate-y-0 disabled:hover:shadow-none`}
              style={{ background: selected ? primary : undefined }}
            >
              {day.day}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs font-bold text-[#6B7280]">
        Data selecionada: <span style={{ color: primary }}>{formatDisplayDate(selectedDate)}</span>
      </p>
    </div>
  );
}

function SubmitButton({ accent, disabled }: { accent: string; disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="cta-glow min-h-13 w-full rounded-xl font-black text-white shadow-xl transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ background: accent }}
    >
      {pending ? "Enviando solicitação..." : "Solicitar Reserva"}
    </button>
  );
}

function formatMissingFields(fields: Array<string | null>) {
  const values = fields.filter((field): field is string => Boolean(field));

  if (values.length <= 1) {
    return values[0] ?? "os campos obrigatórios";
  }

  return `${values.slice(0, -1).join(", ")} e ${values.at(-1)}`;
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="block min-w-0 rounded-2xl border border-[#E8E2D4] bg-white p-4 card-shadow transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:ring-2 focus-within:ring-emerald-900/20">
      <span className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#6B7280]">
        {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
        {label}
      </span>
      {children}
    </div>
  );
}

function monthStart(date: string) {
  const [year, month] = date.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function buildCalendarDays(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const days: Array<{ date: string; day: number | null }> = [];

  for (let index = 0; index < firstDay; index += 1) {
    days.push({ date: "", day: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({ date: formatDate(new Date(year, monthIndex, day)), day });
  }

  return days;
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
