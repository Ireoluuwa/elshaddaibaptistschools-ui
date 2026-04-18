"use client";

import React, { useState } from "react";
import { 
  Wallet, 
  Download, 
  Upload, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  FileText,
  Clock
} from "lucide-react";
import { schoolBankDetails, currentFinanceSummary, mockPaymentHistory } from "@/constants/student/finance.constants";
import ReceiptUploadModal from "@/components/student/finances/ReceiptUploadModal";

export default function StudentFinancesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-10">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#0e2e1d] text-2xl font-black tracking-tight uppercase">
            School Finances
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Manage your school fees, view balance details, and upload payment receipts.
          </p>
        </div>
        
        <button className="w-fit flex items-center gap-2 px-6 py-3 bg-[#006442] hover:bg-[#005236] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#006442]/20 active:scale-95">
          <Download size={16} />
          Download
        </button>
      </div>

      {/* Financial Overview (No Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-y border-gray-100 py-10">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Total Amount for Term</span>
          <div className="flex items-baseline gap-1 text-[#0e2e1d]">
            <span className="text-xl font-bold">{currentFinanceSummary.currency}</span>
            <span className="text-4xl font-bold">{currentFinanceSummary.termTotal.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-[#991b1b] uppercase tracking-[0.2em] opacity-60">Pending Balance</span>
          <div className="flex items-baseline gap-1 text-[#991b1b]">
            <span className="text-xl font-bold">{currentFinanceSummary.currency}</span>
            <span className="text-4xl font-bold">{currentFinanceSummary.pendingBalance.toLocaleString()}</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 italic">Please complete payment before the term exam.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Payment Instructions */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Building2 size={18} className="text-[#006442]" />
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              Payment Instructions
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Payments should be made via bank transfer to the official school account below. Include the Payment Reference in your transfer narration.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { label: "Bank Name", value: schoolBankDetails.bankName },
                { label: "Account Name", value: schoolBankDetails.accountName },
                { label: "Account Number", value: schoolBankDetails.accountNumber, copyable: true },
                { label: "Payment Reference", value: schoolBankDetails.paymentReference, copyable: true }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 group">
                   <span className="text-[10px] font-bold text-[#006442]/50 uppercase tracking-widest">{item.label}</span>
                   <div className="flex items-center justify-between">
                     <span className="text-sm font-bold text-[#0e2e1d]">{item.value}</span>
                     {item.copyable && (
                        <button 
                          onClick={() => copyToClipboard(item.value, item.label)}
                          className="p-2 text-gray-300 hover:text-[#006442] transition-colors"
                        >
                          {copiedField === item.label ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                     )}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action & Status */}
        <div className="flex flex-col gap-8">
           <div className="flex items-center gap-3">
              <Upload size={18} className="text-[#006442]" />
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                Confirm Payment
              </h2>
           </div>

           <div className="p-8 rounded-[1.5rem] bg-[#006442]/5 border border-[#006442]/10 flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#006442] shadow-sm">
                <FileText size={28} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-[#0e2e1d] uppercase tracking-tight">Already Paid?</h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed px-4">
                  If you have completed your bank transfer, please upload your receipt for verification.
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-12 bg-[#006442] hover:bg-[#005236] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Upload size={14} />
                Upload Payment Receipt
              </button>
           </div>

           {/* Quick History Overlay */}
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                 <Clock size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Recent Activity</span>
              </div>
              {mockPaymentHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-t border-gray-50 group">
                   <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-gray-700">{item.currency || "₦"}{item.amount.toLocaleString()}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{item.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${item.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {item.status}
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>

      <footer className="text-center text-gray-400 text-[10px] py-12 mt-8 font-bold uppercase tracking-[0.3em] opacity-60">
        &copy; {new Date().getFullYear()} El-Shaddai Schools. Financial Portal.
      </footer>

      {/* Modal Overlay */}
      <ReceiptUploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
