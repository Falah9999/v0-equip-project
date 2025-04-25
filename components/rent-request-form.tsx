"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RentRequestFormProps {
  dict: {
    title: string
    startDate: string
    endDate: string
    duration: string
    days: string
    weeks: string
    months: string
    message: string
    messagePlaceholder: string
    submit: string
    success: string
  }
  equipmentId: string
}

export default function RentRequestForm({ dict, equipmentId }: RentRequestFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [duration, setDuration] = useState("days")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setStartDate(undefined)
        setEndDate(undefined)
        setMessage("")
      }, 3000)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-medium">{dict.title}</h4>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs">{dict.startDate}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? startDate.toLocaleDateString() : dict.startDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1">
          <label className="text-xs">{dict.endDate}</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? endDate.toLocaleDateString() : dict.endDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => (startDate ? date < startDate : false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs">{dict.duration}</label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger>
            <SelectValue placeholder={dict.duration} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">{dict.days}</SelectItem>
            <SelectItem value="weeks">{dict.weeks}</SelectItem>
            <SelectItem value="months">{dict.months}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <label className="text-xs">{dict.message}</label>
        <Textarea
          placeholder={dict.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={!startDate || !endDate || isSubmitting}>
        {isSuccess ? dict.success : dict.submit}
      </Button>
    </form>
  )
}
