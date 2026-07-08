# Left-to-Right Toxic Smoke Asset Prompt

Use this prompt in Runway Gen-3, Pika, Kling, Sora, or any VFX text-to-video/image-sequence model that supports alpha export.

## Master Prompt
Create a cinematic transparent-background VFX element of dense toxic green smoke moving strictly from left to right. The smoke must begin off-screen left, roll in with volumetric billows, and fully cover the frame by mid animation. The leading edge must glow bright neon green, like ionized gas, with stronger luminosity than the smoke body. The smoke body should be dark forest green and black in the core, with detailed turbulent curls and realistic density falloff. No text, no logos, no people, no objects, no camera movement, no zoom, no scene background. Keep the smoke isolated on transparency. The smoke should continue drifting right and then thin out for reveal.

## Negative Prompt
No upward-only smoke, no bottom-to-top motion, no centered hover cloud, no purple hues, no blue hues, no fire, no sparks, no particles unrelated to smoke, no background plate, no hard-edged matte artifacts, no static frame.

## Technical Targets
- Duration: 1.5s to 1.8s
- Frame rate: 30 fps
- Resolution: 1920x1080
- Motion: predominantly horizontal left-to-right
- Coverage goal: 100% frame occlusion at around 45% to 60% of clip
- Output preference A: WebM with alpha channel
- Output preference B: PNG image sequence with alpha

## If Alpha WebM Is Not Directly Available
1. Export ProRes 4444 with alpha (or PNG sequence with alpha).
2. Convert to VP9 WebM alpha:

```bash
ffmpeg -framerate 30 -i smoke_%04d.png -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 24 green-smoke-ltr.webm
```

## Recommended File Name
- green-smoke-ltr.webm

## Recommended Placement
- public/assets/transitions/green-smoke-ltr.webm
