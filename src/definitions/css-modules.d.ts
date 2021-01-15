declare module '*.css' {
  const styles: { [className: string]: string };
  // eslint-disable-next-line
  export default styles;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  // eslint-disable-next-line
  export default styles;
}

declare module '*.png' {
  const src: string;
  // eslint-disable-next-line
  export default src;
}
