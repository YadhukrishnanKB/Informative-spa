export interface WidgetContent {
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  items?: WidgetItem[];
  images?: string[];
  questions?: FAQItem[];
}

export interface WidgetItem {
  title?: string;
  description?: string;
  icon?: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ThemeValues {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  logo?: string;
  favicon?: string;
  footerText?: string;
}
