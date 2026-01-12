"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Login from "./Login";
import { useSession, SessionProvider } from "next-auth/react";
import { menuService } from "@/data/menuService";

function NavbarContent() {
  const { data: session, status } = useSession();
  const classStyleDesktopActive =
    "flex items-center gap-1 p-2 bg-slate-50 rounded-md relative border border-cyan-800 text-sm relative";
  const classStyleDesktop =
    "flex items-center gap-1 p-2 hover:bg-slate-50 border border-slate-200 rounded-md relative text-sm relative";

  const { push: navigate } = useRouter();
  const [mMob, setMob] = useState(false);
  const currentRoute = usePathname();

  const LinkMobile = ({ to }) => {
    navigate(to);
    setTimeout(() => {
      setMob(false);
    }, 400);
  };

  const grouped = menuService.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-white text-black border-b top-0 sticky z-[999]">
        {/* Start Menu Mobile  */}
        <div
          className={
            mMob
              ? "w-full h-[100vh] left-0 absolute bg-white border-b overflow-hidden transition-all duration-500 z-[99]"
              : "w-full h-0 left-0 absolute bg-white overflow-hidden transition-all duration-500 z-[99]"
          }
        >
          <div className="px-3 h-[60px] flex justify-between items-center border-b">
            <Link href={"/"} className="md:w-[13%]">
              <Image
                className={
                  currentRoute === "/" ? "rounded-sm " : " rounded-sm "
                }
                src="/favicon.png"
                alt="Logo toolsz"
                width={40}
                height={40}
              />
            </Link>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-list md:hidden"
                viewBox="0 0 16 16"
                onClick={() => setMob(!mMob)}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>

              <button className="bg-gradient-to-r from-gray-800 to-slate-900 font-medium text-white px-3 py-[7px] rounded-lg flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-award"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                </svg>
                Dukung Kami
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-scroll h-[90dvh] w-full gap-1 px-1 py-2 z-[99]">
            {menuService.map((item) => (
              <button
                key={item.href}
                onClick={() => LinkMobile({ to: item.href })}
                className={
                  currentRoute === item.href
                    ? "flex items-center gap-2 p-2 bg-slate-50 border rounded-md relative"
                    : "flex items-center gap-2 p-2 hover:bg-slate-50 border border-white rounded-md relative"
                }
              >
                {item.icon}
                <div>{item.text}</div>

                {item.top == 1 && (
                  <svg
                    className="w-4 h-4 text-red-600 absolute right-0 top-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.1076 3.02722c.7328-.91889 2.119-1.42653 3.3155-.63652 1.0296.67976 1.6636 2.15898.8437 3.43103l-1.1345 1.92424c.49.5379.8177 1.21684 1.0172 2.04053l.0026.01069.0023.01075c.1578.72086.0871 1.45746-.1496 2.19206H14.5v-2c0-.55228-.4477-1-1-1h-2.5594c.5551-.83927 1.1449-1.47688 1.7703-1.91901.9836-.6954 2.0299-.88485 3.0301-.63643.241.05985.4787.12994.7103.21464l1.104-1.87249c.0086-.01459.0176-.02895.0269-.04309.0543-.0822.0714-.17722.0369-.29792-.0378-.13197-.1376-.28012-.298-.38598-.0822-.05428-.1772-.07137-.2979-.03684-.132.03775-.2801.13762-.386.29795-.0855.12955-.2.23741-.3345.31504l-.0812.04692c-.4783.27614-1.0899.11227-1.3661-.36603-.2529-.43808-.1367-.98799.2522-1.28954ZM9.83662 11c-1.33245 2.5771-2.51227 3.9661-3.95291 5.2762l-.00417.0037c-.34799.3058-.73582.6466-1.15874 1.119-.95621.9127-1.14739 2.388-.33504 3.4923.76302 1.0372 2.14652 1.4429 3.29215.9596l.01259-.0054c1.55-.6791 3.9409-1.8247 5.2534-2.8182l.008-.0061.0079-.0062c2.0804-1.6416 3.7352-3.23 4.8173-4.7191.0713-.0982.1408-.1968.2082-.2958H13.5c-.5523 0-1-.4477-1-1v-2H9.83662Z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* End Menu Mobile  */}

        <div className="container px-3 md:px-0 mx-auto flex justify-between items-center h-[60px]">
          <Link href={"/"} className="md:w-[13%]">
            <Image
              className={currentRoute === "/" ? "rounded-sm " : " rounded-sm "}
              src="/favicon.png"
              alt="Logo toolsz"
              width={40}
              height={40}
            />
          </Link>

          <div className="hidden md:flex justify-center gap-6 md:w-[65%]">
            <span
              className={`group py-[17px] border-b-2 font-medium  hover:border-slate-500 cursor-pointer ${
                currentRoute === "/layanan"
                  ? "border-slate-500"
                  : "border-white"
              }`}
            >
              <div className="flex items-center gap-[7px]">
                <Link
                  href={"/layanan"}
                  className="flex flex-grow items-center gap-1"
                >
                  {" "}
                  {currentRoute.startsWith("/layanan") &&
                    currentRoute !== "/layanan" && (
                      <i className="w-2 h-2 rounded-full bg-slate-600"></i>
                    )}{" "}
                  Layanan
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className="group-hover:rotate-180 duration-300"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>

              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 translate-y-24 transition-all duration-500  absolute left-0 top-[60px] min-h-[200px] w-full bg-white rounded-md border p-2 flex gap-5 font-normal cursor-default z-[99]">
                <div className="container mx-auto px-3 lg:px-0 pt-4">
                  {Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-600 mb-2">
                        {category}
                      </h3>
                      <div className="grid md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            title={item.text}
                            className={
                              currentRoute === item.href
                                ? classStyleDesktopActive
                                : classStyleDesktop
                            }
                          >
                            {item.icon}
                            <div className="line-clamp-1">{item.text}</div>
                            {item.top == 1 && (
                              <svg
                                className="w-4 h-4 text-red-600 absolute right-0 top-0"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M15.1076 3.02722c.7328-.91889 2.119-1.42653 3.3155-.63652 1.0296.67976 1.6636 2.15898.8437 3.43103l-1.1345 1.92424c.49.5379.8177 1.21684 1.0172 2.04053l.0026.01069.0023.01075c.1578.72086.0871 1.45746-.1496 2.19206H14.5v-2c0-.55228-.4477-1-1-1h-2.5594c.5551-.83927 1.1449-1.47688 1.7703-1.91901.9836-.6954 2.0299-.88485 3.0301-.63643.241.05985.4787.12994.7103.21464l1.104-1.87249c.0086-.01459.0176-.02895.0269-.04309.0543-.0822.0714-.17722.0369-.29792-.0378-.13197-.1376-.28012-.298-.38598-.0822-.05428-.1772-.07137-.2979-.03684-.132.03775-.2801.13762-.386.29795-.0855.12955-.2.23741-.3345.31504l-.0812.04692c-.4783.27614-1.0899.11227-1.3661-.36603-.2529-.43808-.1367-.98799.2522-1.28954ZM9.83662 11c-1.33245 2.5771-2.51227 3.9661-3.95291 5.2762l-.00417.0037c-.34799.3058-.73582.6466-1.15874 1.119-.95621.9127-1.14739 2.388-.33504 3.4923.76302 1.0372 2.14652 1.4429 3.29215.9596l.01259-.0054c1.55-.6791 3.9409-1.8247 5.2534-2.8182l.008-.0061.0079-.0062c2.0804-1.6416 3.7352-3.23 4.8173-4.7191.0713-.0982.1408-.1968.2082-.2958H13.5c-.5523 0-1-.4477-1-1v-2H9.83662Z" />
                              </svg>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </span>
            <Link
              href={"/tentang-kami"}
              className={`group py-[17px] relative border-b-2  font-medium  hover:border-slate-500 cursor-pointer ${
                currentRoute === "/tentang-kami"
                  ? "border-slate-500"
                  : "border-white"
              }`}
            >
              Tentang Kami
            </Link>

            {session ? (
              <Link
                href={"/profile"}
                className={`group py-[17px] relative border-b-2  font-medium  hover:border-slate-500 cursor-pointer ${
                  currentRoute === "/profile"
                    ? "border-slate-500"
                    : "border-white"
                }`}
              >
                Profile
              </Link>
            ) : (
              ""
            )}
          </div>

          <div className=" flex items-center gap-2 justify-end md:w-[21%] lg:w-[17%] xl:w-[20%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list md:hidden"
              viewBox="0 0 16 16"
              onClick={() => setMob(!mMob)}
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
            <Login />
            <a
              href="https://saweria.co/fajriyan"
              target="_blank"
              className="hidden sm:flex bg-gradient-to-r hover:ring-2 ring-cyan-600 from-gray-800 to-slate-900 font-medium text-white px-3 py-[7px] min-w-max rounded-lg gap-1 items-center"
            >
              Dukung Kami
            </a>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

const Navbar = () => {
  return (
    <>
      <SessionProvider>
        <NavbarContent />
      </SessionProvider>
    </>
  );
};

export default Navbar;
