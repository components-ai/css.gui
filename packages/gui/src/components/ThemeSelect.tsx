import * as Popover from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { Theme } from "../types/theme";
import { Label } from "./primitives";
import { useTheme } from "./providers/ThemeContext";

export function ThemeSelect() {
  const [open, setOpen] = useState<boolean>(false)
  const { theme, setTheme, themeOptions } = useTheme()

  return (
    <div>
      <Label>Theme</Label>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            borderWidth: '1px',
            borderStyle: 'solid',
            p: 2,
          }}
        >
          <ThemeSwatch key={Math.random()} theme={theme} /> 
        </Popover.Trigger>
        <Popover.Content>
          <div sx={{
            width: '100%',
            borderStyle: 'solid',
            borderWidth: '1px',
            p: 3
          }}>
            {themeOptions.map((themeVal) => {
              return (
                <ThemeSwatch theme={themeVal} onSetTheme={() => {
                  setTheme(themeVal)
                  setOpen(false)
                }} />
              )
            })}
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

interface ThemeSwatchProps {
  theme: Theme,
  onSetTheme?: () => void
}
function ThemeSwatch({ theme, onSetTheme }: ThemeSwatchProps) {
  const [flatColors, setFlatColors] = useState<string[]>([])

  useEffect(() => {
    const colors: string[] = []
    for (const group of theme.colors || []) {
      if (colors.length >= 15) break
      for (const themeValue of group.colors) {
        if (colors.length >= 15) break
        colors.push(themeValue.value)
      }
    }

    setFlatColors(colors)
  }, [])
  return (
    <div 
      sx={{ width: '100%', display: 'flex', p: 2 }}
      onClick={() => onSetTheme && onSetTheme()}>
      {flatColors.map((color, i) => (
        <div
          key={i}
          sx={{
            width: '1rem',
            aspectRatio: '1 / 1',
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
