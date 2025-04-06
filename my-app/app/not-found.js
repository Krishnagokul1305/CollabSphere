export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p className="text-muted-foreground">
          We couldn’t find the page you were looking for.
        </p>
      </div>
    </div>
  );
}
