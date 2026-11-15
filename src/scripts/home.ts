import Lenis from "lenis"

const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

const tasks = new Set<() => void>()
let queued = false

window.addEventListener(
  "scroll",
  () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      for (const task of tasks) task()
    })
  },
  { passive: true },
)

const onScroll = (task: () => void) => tasks.add(task)

const crossed = (
  position: number,
  trigger: number,
  slack: number,
  on: boolean,
) => position < (on ? trigger + slack : trigger)

let lenis: Lenis | undefined

const syncLenis = () => {
  lenis?.destroy()
  lenis = motion.matches ? undefined : new Lenis({ lerp: 0.1, autoRaf: true })
}

syncLenis()
motion.addEventListener("change", syncLenis)

const initFab = () => {
  const slot = document.getElementById("contact-slot")
  const fab = document.getElementById("contact-fab")
  const afterHero = document.getElementById("after-hero")
  if (!slot || !fab || !afterHero) return

  const MARGIN = 24
  const SCALE = 0.85
  const FLY_MS = 650
  const SLACK = 30
  const PULSE_MS = 700

  type Pose = { x: number; y: number; scale: number }

  const transform = ({ x, y, scale }: Pose) =>
    `translate3d(${x}px, ${y}px, 0) scale(${scale})`

  let home: Pose
  let docked: Pose
  let trigger = 0
  let isDocked = false
  let flight: Animation | null = null

  const measure = () => {
    const { offsetWidth: width, offsetHeight: height } = fab
    slot.style.width = `${width}px`
    slot.style.height = `${height}px`
    fab.toggleAttribute("data-floating", true)

    const { left, top, bottom } = slot.getBoundingClientRect()
    const view = document.documentElement
    home = { x: left, y: top, scale: 1 }
    docked = {
      x: view.clientWidth - MARGIN - width * SCALE,
      y: view.clientHeight - MARGIN - height * SCALE,
      scale: SCALE,
    }
    trigger = bottom
  }

  const setDocked = (docked: boolean) => {
    isDocked = docked
    fab.toggleAttribute("data-docked", docked)
  }

  const shouldDock = () =>
    crossed(afterHero.getBoundingClientRect().top, trigger, SLACK, isDocked)

  const snap = () => {
    flight?.cancel()
    flight = null
    fab.style.transform = transform(isDocked ? docked : home)
  }

  const pulse = () => {
    fab.animate(
      [
        { boxShadow: "0 0 0 0 rgba(23, 23, 23, 0.35)" },
        { boxShadow: "0 0 0 18px rgba(23, 23, 23, 0)" },
      ],
      { duration: PULSE_MS, easing: "ease-out" },
    )
  }

  const fly = (target: Pose, docking: boolean) => {
    const rect = fab.getBoundingClientRect()
    flight?.cancel()

    fab.style.transform = transform(target)
    const next = fab.animate(
      [
        {
          transform: transform({
            x: rect.left,
            y: rect.top,
            scale: rect.width / fab.offsetWidth,
          }),
        },
        { transform: transform(target) },
      ],
      { duration: FLY_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    )
    flight = next

    next.onfinish = () => {
      if (flight === next) flight = null
      if (docking) pulse()
    }
  }

  const update = () => {
    const next = shouldDock()
    if (next === isDocked) return

    setDocked(next)
    if (motion.matches) snap()
    else fly(next ? docked : home, next)
  }

  const refresh = () => {
    measure()
    setDocked(shouldDock())
    snap()
  }

  document.body.appendChild(fab)
  refresh()
  onScroll(update)
  window.addEventListener("resize", refresh)
  window.addEventListener("load", refresh)
  document.fonts?.ready.then(refresh)
}

const initBrand = () => {
  const brand = document.getElementById("brand")
  const word = document.getElementById("brand-word")
  const header = document.querySelector("header")
  const afterHero = document.getElementById("after-hero")
  if (!brand || !word || !header || !afterHero) return

  const SLACK = 20
  let marked = false

  const measure = () =>
    brand.style.setProperty(
      "--w-text",
      `${word.getBoundingClientRect().width}px`,
    )

  const update = () => {
    const { bottom } = brand.getBoundingClientRect()
    const next = crossed(
      afterHero.getBoundingClientRect().top,
      bottom,
      SLACK,
      marked,
    )
    if (next === marked) return

    marked = next
    header.toggleAttribute("data-mark", next)
  }

  const refresh = () => {
    measure()
    update()
  }

  refresh()
  onScroll(update)
  window.addEventListener("resize", refresh)
  document.fonts?.ready.then(refresh)
}

initFab()
initBrand()
