"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

// Use : AddMoney()
// Need : A card component to add money to the wallet.





// Hardcoded list of supported banks
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];




export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount , setAmount] = useState(0);
    const [provider , setProvider] = useState(SUPPORTED_BANKS[0]?.name ||"");




    return <Card title="Add Money">
    <div className="w-full">

        
        {/* Input field to enter the amount */}
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value));
        }} />
        <div className="py-4 text-left">
            Bank
        </div>



         {/* Dropdown to select the bank */}
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(it => it.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(it => it.name === value)?.redirectUrl || "");
        }} options={SUPPORTED_BANKS.map(it => ({
            key: it.name,
            value: it.name
        }))} />


        {/* Button to add money */}
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                window.location.href = redirectUrl || "";
                await createOnRampTransaction(amount, provider);
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}