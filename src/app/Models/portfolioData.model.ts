export interface portfolioData {
  _id: string;
  img: string;
  name: string;
  category: string;
  demoURL: string;
  gitURL: string;
  description: {
    frontend: {
      name: string,
      url: string,
      icon: string
    }[],
    backend: {
      name: string,
      url: string,
      icon: string
    }[],
    framework: {
      name: string,
      url: string,
      icon: string
    }[],
    database: {
      name: string,
      url: string,
      icon: string
    }[],
    library: {
      name: string,
      url: string,
      icon: string
    }[],
    font: {
      name: string,
      url: string,
      icon: string
    }[],
    icon: {
      name: string,
      url: string,
      icon: string
    }[],
  };
}
