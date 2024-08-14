"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()

    // Checking if the selected item is the same as the href
    // Selected = true , when (curent path == href)
    // current path = current url
    // href = url assigned to each sidebar item
    // Example : (/transfer == /transfer) => Selected = true -> change color -of-> tranfer(sidebar item)
    const selected = pathname === href


    return (
    // Setting the sidebar div such that the elected item changes color and the selected item is clickable
    <div 
        className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} 
        onClick={() => {router.push(href);}}>

        {/* // Icon at the sidebar item */}
        <div className="pr-2">{icon}</div>

        {/* Title of the selected Item */}
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>{title}</div>

    </div>
    )
}