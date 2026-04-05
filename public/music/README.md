# Local Music Folder

Place all your `.mp3`, `.wav`, or `.ogg` audio files in this directory. 

Because this folder is inside the Next.js `public/` directory, any file you add here is automatically served to your website exactly exactly as if it were on the internet! 

## How to use:
If you place a file named `my-birthday-song.mp3` in this folder, you can access it in the code by updating the `src` attribute in `src/components/AudioPlayer.tsx` to:

```tsx
src="/music/my-birthday-song.mp3"
```
