
const responsiveTextSizes = {
  "9xl": "xl:text-9xl lg:text-8xl md:text-8xl sm:text-8xl text-8xl",
  "8xl": "xl:text-8xl lg:text-7xl md:text-7xl sm:text-7xl text-7xl",
  "7xl": "xl:text-7xl lg:text-6xl md:text-6xl sm:text-6xl text-6xl",
  "6xl": "xl:text-6xl lg:text-5xl md:text-5xl sm:text-5xl text-5xl",
  "5xl": "xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl text-4xl",
  "4xl": "xl:text-4xl lg:text-4xl md:text-3xl sm:text-3xl text-3xl",
  "3xl": "xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-2xl",
  "2xl": "xl:text-2xl lg:text-2xl md:text-xl sm:text-xl text-xl",
  "xl": "xl:text-xl lg:text-xl text-lg",
  "lg": "xl:text-lg lg:text-lg md:text-md",
  "md": "xl:text-md lg:text-md md:text-sm text-sm",
  "sm": "text-sm",
  "xs": "text-xs"
}

const responsivePadding = {
  all: {
    "6xl": "xl:p-9 lg:p-8 md:p-7 sm:p-6 p-5",
    "5xl": "xl:p-8 lg:p-7 md:p-6 sm:p-5 p-4",
    "4xl": "xl:p-7 lg:p-6 md:p-5 sm:p-5 p-3",
    "3xl": "xl:p-6 lg:p-5 md:p-4 sm:p-4 p-3",
    "2xl": "xl:p-5 lg:p-5 md:p-4 sm:p-3 p-2",
    "xl": "xl:p-4 lg:p-4 md:p-3 sm:p-2 p-2",
    "lg": "xl:p-3 lg:p-3 md:p-2 sm:p-1 p-1",
    "md": "xl:p-2 lg:p-2 md:p-1 sm:p-1 p-1",
  },

  top: {
    "6xl": "xl:pt-9 lg:pt-8 md:pt-7 sm:pt-6 pt-5",
    "5xl": "xl:pt-8 lg:pt-7 md:pt-6 sm:pt-5 pt-4",
    "4xl": "xl:pt-7 lg:pt-6 md:pt-5 sm:pt-5 pt-3",
    "3xl": "xl:pt-6 lg:pt-5 md:pt-4 sm:pt-4 pt-3",
    "2xl": "xl:pt-5 lg:pt-5 md:pt-4 sm:pt-3 pt-2",
    "xl": "xl:pt-4 lg:pt-4 md:pt-3 sm:pt-2 pt-2",
    "lg": "xl:pt-3 lg:pt-3 md:pt-2 sm:pt-1 pt-1",
    "md": "xl:pt-2 lg:pt-2 md:pt-1 sm:pt-1 pt-1",
  },

  bottom: {
    "6xl": "xl:pb-9 lg:pb-8 md:pb-7 sm:pb-6 pb-5",
    "5xl": "xl:pb-8 lg:pb-7 md:pb-6 sm:pb-5 pb-4",
    "4xl": "xl:pb-7 lg:pb-6 md:pb-5 sm:pb-5 pb-3",
    "3xl": "xl:pb-6 lg:pb-5 md:pb-4 sm:pb-4 pb-3",
    "2xl": "xl:pb-5 lg:pb-5 md:pb-4 sm:pb-3 pb-2",
    "xl": "xl:pb-4 lg:pb-4 md:pb-3 sm:pb-2 pb-2",
    "lg": "xl:pb-3 lg:pb-3 md:pb-2 sm:pb-1 pb-1",
    "md": "xl:pb-2 lg:pb-2 md:pb-1 sm:pb-1 pb-1",
  }
}

const responsiveDividerSizes = {
  horizontal: {
    "3xl": "xl:h-28 lg:h-24 md:h-20 sm:h-16 h-16",
    "2xl": "xl:h-24 lg:h-20 md:h-16 sm:h-14 h-12",
    "xl": "xl:h-20 lg:h-16 md:h-14 sm:h-12 h-10",
    "lg": "xl:h-16 lg:h-14 md:h-12 sm:h-10 h-8",
    "md": "xl:h-14 lg:h-12 md:h-10 sm:h-8 h-6",
    "sm": "xl:h-12 lg:h-10 md:h-8 sm:h-6 h-4",
    "xs": "xl:h-9 lg:h-8 md:h-6 sm:h-5 h-3",
    "2xs": "xl:h-7 lg:h-6 md:h-5 sm:h-4 h-2",
    "3xs": "xl:h-5 lg:h-4 md:h-3 sm:h-2 h-1",
  },

  vertical: {
    "3xl": "xl:w-28 lg:w-24 md:w-20 sm:w-16 w-16",
    "2xl": "xl:w-24 lg:w-20 md:w-16 sm:w-14 w-12",
    "xl": "xl:w-20 lg:w-16 md:w-14 sm:w-12 w-12",
  }
}

const responsiveWidths = {
  "max": "w-full",
  "xl": "w-full xl:w-[95%] lg:w-[95%] md:w-[97%] sm:w-[97%]",
  "lg": "w-full xl:w-[88%] lg:w-[88%] md:w-[92%] sm:w-[92%]",
  "md": "w-full xl:w-[75%] lg:w-[80%] md:w-[85%] sm:w-[92%]",
  "sm": "w-full xl:w-[60%] lg:w-[65%] md:w-[70%] sm:w-[80%]",
  "xs": "w-full xl:w-[45%] lg:w-[55%] md:w-[70%] sm:w-[80%]",
  "2xs": "w-full xl:w-[35%] lg:w-[45%] md:w-[60%] sm:w-[70%]",
}


// Divider Sizes
export const getDividerSize = (direction, size) => responsiveDividerSizes[direction][size] || "";

// Padding
export const getPaddingTop = size => responsivePadding.top[size] || "";
export const getPaddingBottom = size => responsivePadding.bottom[size] || "";
export const getPadding = size => responsivePadding.all[size] || "";

// Text Size
export const getTextSize = size => responsiveTextSizes[size] || "";

// Width
export const getWidth = size => responsiveWidths[width] || "";
