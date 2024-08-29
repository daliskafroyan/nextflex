"use client"

import { UserIcon, LogOutIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"

const PROFILE_STRINGS = {
    signOut: 'Sign Out',
    signingOut: 'Signing out...'
}

export function ProfileDropdown({ userImage }: { userImage?: string }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={userImage} />
                    <AvatarFallback>
                        <UserIcon className='w-6 h-6' />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link className='flex items-center' href={'/api/sign-out'}>
                        <LogOutIcon className='w-4 h-4 mr-2' />
                        {PROFILE_STRINGS.signOut}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

