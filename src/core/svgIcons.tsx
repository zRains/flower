export function ArrowDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0"
      />
    </svg>
  )
}
export function DeleteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
      />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
      <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
      <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
    </svg>
  )
}

export function BanIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a7.92 7.92 0 0 1 1.69-4.9L16.9 18.31A7.92 7.92 0 0 1 12 20m6.31-3.1L7.1 5.69A7.92 7.92 0 0 1 12 4a8 8 0 0 1 8 8a7.92 7.92 0 0 1-1.69 4.9"
      />
    </svg>
  )
}

export function MoreIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m14 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
      />
    </svg>
  )
}

interface ApiServiceIconProps {
  className?: string
}

export function ApiServiceIcon(props: ApiServiceIconProps) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28">
      <path
        fill="currentColor"
        d="M22.74 6.327a5.501 5.501 0 0 1-.495 7.212L20.3 15.483a.75.75 0 0 1-1.06 0l-6.718-6.717a.75.75 0 0 1 0-1.06l1.945-1.945a5.501 5.501 0 0 1 7.212-.495l3.044-3.044a.75.75 0 0 1 1.061 1.06zm-9.963 5.949a.75.75 0 0 0-1.06-1.061L9.59 13.341l-.822-.822a.75.75 0 0 0-1.06 0l-1.945 1.944a5.501 5.501 0 0 0-.495 7.212L2.224 24.72a.75.75 0 1 0 1.06 1.06l3.045-3.044a5.501 5.501 0 0 0 7.212-.494l1.944-1.945a.75.75 0 0 0 0-1.06l-.827-.828l2.126-2.125a.75.75 0 1 0-1.061-1.06l-2.125 2.125l-2.947-2.947z"
      />
    </svg>
  )
}

interface EndIconProps {
  className?: string
}

export function EndIcon(props: EndIconProps) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <g fill="none">
        <path
          fill="currentColor"
          d="m2 12l-.78-.625l-.5.625l.5.625zm9 1a1 1 0 1 0 0-2zM5.22 6.375l-4 5l1.56 1.25l4-5zm-4 6.25l4 5l1.56-1.25l-4-5zM2 13h9v-2H2z"
        />
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M10 8.132v-.743c0-1.619 0-2.428.474-2.987c.474-.56 1.272-.693 2.868-.96l1.672-.278c3.243-.54 4.864-.81 5.925.088C22 4.151 22 5.795 22 9.082v5.835c0 3.288 0 4.932-1.06 5.83c-1.062.9-2.683.63-5.926.089l-1.672-.279c-1.596-.266-2.394-.399-2.868-.958C10 19.039 10 18.229 10 16.61v-.545"
        />
      </g>
    </svg>
  )
}

interface MessageIconProps {
  className?: string
}

export function MessageIcon(props: MessageIconProps) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.605 4.17a4.67 4.67 0 0 0-3.33-1.38H6.705a4.71 4.71 0 0 0-4.71 4.72v6.6a4.71 4.71 0 0 0 4.71 4.72h2.33l1.95 1.94c.127.143.284.255.46.33c.175.072.361.11.55.11c.189-.002.375-.04.55-.11a1.58 1.58 0 0 0 .44-.31l2-2h2.33a4.69 4.69 0 0 0 3.33-1.38a4.8 4.8 0 0 0 1-1.53c.234-.575.357-1.19.36-1.81v-6.6a4.67 4.67 0 0 0-1.4-3.3m-13.24 8.17a1.66 1.66 0 1 1 1.66-1.66a1.67 1.67 0 0 1-1.66 1.66m4.63 0a1.66 1.66 0 1 1 0-3.32a1.66 1.66 0 0 1 0 3.32m4.62 0a1.66 1.66 0 1 1 1.66-1.66a1.67 1.67 0 0 1-1.66 1.66"
      />
    </svg>
  )
}
interface StartIconProps {
  className?: string
}

export function StartIcon(props: StartIconProps) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <g fill="none">
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M7 7.132v-.52c0-2.146 0-3.219.69-3.817c.69-.598 1.751-.446 3.876-.143l4.282.612c2.457.351 3.685.526 4.418 1.372C21 5.482 21 6.723 21 9.204v5.592c0 2.481 0 3.722-.734 4.568c-.733.846-1.961 1.021-4.417 1.372l-4.283.612c-2.125.303-3.187.455-3.876-.143C7 20.607 7 19.534 7 17.388v-.322"
        />
        <path
          fill="currentColor"
          d="m16 12l.78-.625l.5.625l-.5.625zM4 13a1 1 0 1 1 0-2zm8.78-6.625l4 5l-1.56 1.25l-4-5zm4 6.25l-4 5l-1.56-1.25l4-5zM16 13H4v-2h12z"
        />
      </g>
    </svg>
  )
}

export function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.952 3.048a3.578 3.578 0 0 0-5.06 0L3.94 15a3.106 3.106 0 0 0-.825 1.476L2.02 21.078a.75.75 0 0 0 .904.903l4.601-1.096a3.106 3.106 0 0 0 1.477-.825l11.95-11.95a3.578 3.578 0 0 0 0-5.06m-4 1.06a2.078 2.078 0 1 1 2.94 2.94L19 7.939L16.06 5zM15 6.062L17.94 9l-10 10c-.21.21-.474.357-.763.426l-3.416.814l.813-3.416c.069-.29.217-.554.427-.764z"
      />
    </svg>
  )
}
