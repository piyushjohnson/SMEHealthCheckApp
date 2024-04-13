function TopNav() {
  return (
    <nav className="min-h-14 p-4 bg-gradient-to-r from-purple-900 via-violet-900 to-purple-800">
      <div className="flex flex-col items-center sm:flex-row justify-center text-center">
        <svg className="size-6">
          <use href="logo.svg#default" />
        </svg>
        <p className="text-white text-lg sm:ml-auto">
          SME Health Check - Get Started
        </p>
      </div>
    </nav>
  );
}

export default TopNav;
