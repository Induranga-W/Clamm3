declare module "qrcode" {
  interface QRCodeToDataURLOptions {
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  }

  function toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>;
  function toString(text: string, options?: QRCodeToDataURLOptions): Promise<string>;

  export { toDataURL, toString };
  export default { toDataURL, toString };
}
