"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import {
  Star,
  Send,
  CheckCircle2,
  ArrowLeft,
  User,
  Mail,
  Building2,
  PenLine,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui"
import { firms } from "@/config/firms"

function StarRatingInput({
  value,
  onChange,
}: {
  value: number
  onChange: (rating: number) => void
}) {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          onMouseEnter={() => setHoverValue(rating)}
          onMouseLeave={() => setHoverValue(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              rating <= (hoverValue || value)
                ? "text-accent fill-accent"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
      <span className="ml-3 text-lg font-medium text-white">
        {value > 0 ? `${value}/5` : "Selecteer"}
      </span>
    </div>
  )
}

export default function SchrijfReviewPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    title: "",
    content: "",
    firmSlug: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Naam is verplicht"
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-mail is verplicht"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in"
    }
    if (formData.rating === 0) {
      newErrors.rating = "Selecteer een beoordeling"
    }
    if (!formData.title.trim()) {
      newErrors.title = "Titel is verplicht"
    }
    if (!formData.content.trim()) {
      newErrors.content = "Review tekst is verplicht"
    } else if (formData.content.trim().length < 50) {
      newErrors.content = "Review moet minimaal 50 karakters bevatten"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Build mailto link
    const firmName = formData.firmSlug
      ? firms.find((f) => f.slug === formData.firmSlug)?.name || ""
      : "Geen specifieke firm"

    const subject = encodeURIComponent(
      `Nieuwe Review: ${formData.title} (${formData.rating}/5 sterren)`
    )

    const body = encodeURIComponent(
      `NIEUWE REVIEW VOOR FUNDED TRADING NEDERLAND
======================================

Naam: ${formData.name}
E-mail: ${formData.email}
Beoordeling: ${formData.rating}/5 sterren
Prop Firm: ${firmName}

Titel: ${formData.title}

Review:
${formData.content}

======================================
Verzonden via het reviewformulier op fundedtrading.nl`
    )

    // Open mailto link
    window.location.href = `mailto:info@fundedtrading.nl?subject=${subject}&body=${body}`

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Bedankt voor je Review!
          </h1>
          <p className="text-muted-foreground mb-8">
            Je e-mailprogramma zou nu moeten openen met je review. Verstuur de e-mail
            om je review in te dienen. We reviewen alle inzendingen en plaatsen deze
            binnen enkele dagen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/ervaringen">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar Ervaringen
              </Link>
            </Button>
            <Button onClick={() => setSubmitted(false)}>
              Nog een Review Schrijven
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 md:pt-52 pb-16">
      <div className="container-wide max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/ervaringen"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar Ervaringen
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Schrijf een Review
          </h1>
          <p className="text-muted-foreground">
            Deel je ervaring met Funded Trading Nederland en help andere traders.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <label className="block text-sm font-medium text-white mb-3">
              Jouw Beoordeling *
            </label>
            <StarRatingInput
              value={formData.rating}
              onChange={(rating) => setFormData({ ...formData, rating })}
            />
            {errors.rating && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.rating}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Naam *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Je volledige naam"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              E-mail *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="je@email.com"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Wordt niet gepubliceerd, alleen voor verificatie
            </p>
            {errors.email && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Prop Firm (Optional) */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Prop Firm (optioneel)
            </label>
            <select
              value={formData.firmSlug}
              onChange={(e) => setFormData({ ...formData, firmSlug: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">Geen specifieke firm</option>
              {firms.map((firm) => (
                <option key={firm.slug} value={firm.slug}>
                  {firm.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted-foreground">
              Selecteer een prop firm als je review daarover gaat
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <PenLine className="w-4 h-4 inline mr-2" />
              Titel van je Review *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Bijv. 'Uitstekende informatie over prop firms'"
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Je Review *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Beschrijf je ervaring met Funded Trading Nederland. Wat vond je goed? Wat kan beter? Hoe heeft de site je geholpen?"
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Minimaal 50 karakters</span>
              <span
                className={
                  formData.content.length < 50 ? "text-red-400" : "text-secondary"
                }
              >
                {formData.content.length}/50
              </span>
            </div>
            {errors.content && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full">
              <Send className="w-5 h-5 mr-2" />
              Review Versturen
            </Button>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Door je review te versturen ga je akkoord met onze{" "}
              <Link href="/voorwaarden" className="text-primary hover:underline">
                voorwaarden
              </Link>
              . Reviews worden gemodereerd voor publicatie.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
