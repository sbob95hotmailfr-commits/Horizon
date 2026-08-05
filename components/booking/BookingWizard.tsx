"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/booking/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { createBooking } from "@/app/(site)/reservation/[id]/actions";
import { PICKUP_LOCATIONS } from "@/lib/constants";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Vehicle } from "@/types/database.types";

export function BookingWizard({
  vehicle,
  isAuthenticated,
}: {
  vehicle: Vehicle;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const [pickupLocation, setPickupLocation] = useState<string>(PICKUP_LOCATIONS[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.round(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  function canContinueStep1() {
    return Boolean(startDate && endDate && endDate >= startDate);
  }

  function canContinueStep2() {
    return Boolean(fullName.trim() && phone.trim());
  }

  async function handleSubmit() {
    if (!isAuthenticated) {
      router.push(`/connexion?suivant=/reservation/${vehicle.id}`);
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await createBooking({
      vehicleId: vehicle.id,
      startDate,
      endDate,
      pickupLocation,
      fullName,
      phone,
    });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Une erreur est survenue.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-4 rounded-2xl border border-black/10 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ivory">
          ✓
        </div>
        <h2 className="text-xl font-semibold">Demande envoyée</h2>
        <p className="text-black/60">
          Votre demande de réservation pour le {vehicle.brand} {vehicle.name} est en attente
          de confirmation. Retrouvez son statut dans votre espace « Mes réservations ».
        </p>
        <Button onClick={() => router.push("/compte/reservations")}>
          Voir mes réservations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProgressBar step={step} />

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-1 text-sm">
              <span className="font-medium">Date de départ</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2"
              />
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium">Date de retour</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-black/15 px-3 py-2"
              />
            </label>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-black/15 px-3 py-2">
            <div>
              <p className="text-xs font-medium text-black/50">Lieu de retrait</p>
              <p className="text-sm font-medium">{pickupLocation}</p>
            </div>
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="text-sm font-medium text-accent hover:underline"
            >
              Modifier
            </button>
          </div>

          <Button
            disabled={!canContinueStep1()}
            onClick={() => setStep(2)}
            className="w-full"
          >
            Continuer
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Nom complet</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-3 py-2"
              placeholder="Prénom Nom"
            />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-medium">Téléphone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-black/15 px-3 py-2"
              placeholder="06 12 34 56 78"
            />
          </label>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1">
              Retour
            </Button>
            <Button
              disabled={!canContinueStep2()}
              onClick={() => setStep(3)}
              className="flex-1"
            >
              Continuer
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="space-y-3 rounded-xl border border-black/10 p-4 text-sm">
            <Row label="Véhicule" value={`${vehicle.brand} ${vehicle.name}`} />
            <Row label="Dates" value={`${formatDate(startDate)} → ${formatDate(endDate)} (${days} j)`} />
            <Row label="Lieu de retrait" value={pickupLocation} />
            <Row label="Conducteur" value={fullName} />
            <Row label="Téléphone" value={phone} />
            <Row
              label="Estimation"
              value={formatPrice(days * vehicle.price_per_day)}
              emphasis
            />
          </div>

          {!isAuthenticated && (
            <p className="text-sm text-black/60">
              Vous devrez vous connecter pour finaliser votre demande.
            </p>
          )}
          {error && <p className="text-sm font-medium text-black">{error}</p>}

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">
              Retour
            </Button>
            <Button disabled={submitting} onClick={handleSubmit} className="flex-1">
              {submitting ? "Envoi…" : "Envoyer la demande"}
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        title="Choisir un lieu de retrait"
      >
        <div className="space-y-2">
          {PICKUP_LOCATIONS.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setPickupLocation(loc);
                setLocationModalOpen(false);
              }}
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-left text-sm hover:border-black/30"
            >
              {loc}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function Row({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-black/50">{label}</span>
      <span className={emphasis ? "text-base font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
