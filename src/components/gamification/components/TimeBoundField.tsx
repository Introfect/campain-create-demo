import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useAppDispatch, useAppSelector, type RootState } from "@/store"
import { setTimeBoundEnabled, setTimeBoundEndDate } from "@/store/slices/gamificationSlice"

export const TimeBoundField = () => {
  const dispatch = useAppDispatch()
  const { enabled, endDate } = useAppSelector((state: RootState) => state.gamification.timeBound)
  const [isOpen, setIsOpen] = useState(false)
  
  const handleDateSelect = (date: Date | undefined) => {
    dispatch(setTimeBoundEndDate(date || null))
    setIsOpen(false) // Close the popover after selection
  }
  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-secondary">
          Make the reward time bound
        </label>
        <Switch 
          checked={enabled}
          onCheckedChange={(checked) => dispatch(setTimeBoundEnabled(checked))}
        />
      </div>
      
      {enabled && (
        <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : <span className="text-muted-foreground">Select end date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate || undefined}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
      
      {enabled && (
        <p className="text-xs text-muted-foreground">
          Choose an end date to stop this reward automatically
        </p>
      )}
    </div>
  )
}
