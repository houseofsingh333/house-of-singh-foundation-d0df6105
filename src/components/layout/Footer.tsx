const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-8 text-center">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} House of Singh. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
