import { SocialLinks } from '../SocialLinks'

export const PageFooter = () => {
  return (
    <footer className="relative z-10 py-8 border-t border-gray-3">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center justify-center flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between">
          <div>
            <p className="text-custom-sm">&copy; 2025 Clarity. All rights reserved</p>
          </div>

          <div>
            <ul className="flex flex-wrap items-center gap-2.5">
              <li>
                <a
                  href="privacy-policy.html"
                  className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark"
                >
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Privacy
                  </span>
                </a>
              </li>
              <li>
                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
              </li>
              <li>
                <a
                  href="privacy-policy.html"
                  className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark"
                >
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Terms
                  </span>
                </a>
              </li>
              <li>
                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
              </li>
              <li>
                <a
                  href="signup.html"
                  className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark"
                >
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Contact
                  </span>
                </a>
              </li>
              <li>
                <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2"></span>
              </li>
              <li>
                <a
                  href="signup.html"
                  className="group leading-none flex text-custom-sm ease-in duration-200 hover:text-dark"
                >
                  <span className="bg-linear-to-r from-dark to-dark bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px]">
                    Contribute
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <p className="font-medium text-custom-sm text-dark">Follow Us:</p>

              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
