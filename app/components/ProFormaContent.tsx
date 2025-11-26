'use client';

export default function ProFormaContent() {
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const growthFactors = [1, 1.02, 1.0404, 1.061208, 1.08243216, 1.104080803, 1.126162419, 1.148685668, 1.171659381, 1.195092569];

  // Market Residential
  const market1BRUnits = 42;
  const market1BRRent = 2750;
  const market2BRUnits = 21;
  const market2BRRent = 3500;
  const market3BRUnits = 9;
  const market3BRRent = 5000;

  const market1BRGPR = years.map((year, i) => 
    Math.round(market1BRUnits * market1BRRent * 12 * growthFactors[i])
  );
  const market2BRGPR = years.map((year, i) => 
    Math.round(market2BRUnits * market2BRRent * 12 * growthFactors[i])
  );
  const market3BRGPR = years.map((year, i) => 
    Math.round(market3BRUnits * market3BRRent * 12 * growthFactors[i])
  );
  const totalMarketGPR = years.map((year, i) => 
    market1BRGPR[i] + market2BRGPR[i] + market3BRGPR[i]
  );
  const marketVacancy = years.map((year, i) => 
    Math.round(totalMarketGPR[i] * 0.05)
  );
  const marketEGI = years.map((year, i) => 
    totalMarketGPR[i] - marketVacancy[i]
  );

  // Affordable Residential
  const affordable1BRUnits = 42;
  const affordable1BRRent = 900;
  const affordable2BRUnits = 21;
  const affordable2BRRent = 1100;
  const affordable3BRUnits = 9;
  const affordable3BRRent = 1500;

  const affordable1BRGPR = years.map((year, i) => 
    Math.round(affordable1BRUnits * affordable1BRRent * 12 * growthFactors[i])
  );
  const affordable2BRGPR = years.map((year, i) => 
    Math.round(affordable2BRUnits * affordable2BRRent * 12 * growthFactors[i])
  );
  const affordable3BRGPR = years.map((year, i) => 
    Math.round(affordable3BRUnits * affordable3BRRent * 12 * growthFactors[i])
  );
  const totalAffordableGPR = years.map((year, i) => 
    affordable1BRGPR[i] + affordable2BRGPR[i] + affordable3BRGPR[i]
  );
  const affordableVacancy = years.map((year, i) => 
    Math.round(totalAffordableGPR[i] * 0.05)
  );
  const affordableEGI = years.map((year, i) => 
    totalAffordableGPR[i] - affordableVacancy[i]
  );

  const totalResidentialEGI = years.map((year, i) => 
    marketEGI[i] + affordableEGI[i]
  );

  // Retail
  const retailSF = 58000;
  const retailRentPerSF = 20; // $20/SF annual
  const retailGPR = years.map((year, i) => 
    Math.round(retailSF * retailRentPerSF * growthFactors[i])
  );
  const retailVacancy = years.map((year, i) => 
    Math.round(retailGPR[i] * 0.10)
  );
  const retailEGI = years.map((year, i) => 
    retailGPR[i] - retailVacancy[i]
  );

  // Office
  const officeSF = 76000;
  const officeRentPerSF = 20; // $20/SF annual
  const officeGPR = years.map((year, i) => 
    Math.round(officeSF * officeRentPerSF * growthFactors[i])
  );
  const officeVacancy = years.map((year, i) => 
    Math.round(officeGPR[i] * 0.12)
  );
  const officeEGI = years.map((year, i) => 
    officeGPR[i] - officeVacancy[i]
  );

  const totalEGI = years.map((year, i) => 
    totalResidentialEGI[i] + retailEGI[i] + officeEGI[i]
  );

  // Operating Expenses
  const opExRatio = 0.35;
  const operatingExpenses = years.map((year, i) => 
    Math.round(totalEGI[i] * opExRatio)
  );

  // Ground Lease
  const groundLeaseExpense = years.map((year, i) => 
    year <= 3 ? 50000 : 1054152
  );

  // NOI
  const noi = years.map((year, i) => 
    totalEGI[i] - operatingExpenses[i] - groundLeaseExpense[i]
  );

  // Debt Service (ISSUE: This seems way too high)
  const debtService = 5654064; // Interest-only

  // Cash Flow
  const cashFlowBeforeSale = years.map((year, i) => 
    noi[i] - debtService
  );

  // Terminal Value (Year 10)
  const year11NOI = Math.round(noi[9] * 1.02);
  const capRate = 0.055;
  const terminalValue = Math.round(year11NOI / capRate);

  const freeCashFlow = years.map((year, i) => 
    i === 9 ? cashFlowBeforeSale[i] + terminalValue : cashFlowBeforeSale[i]
  );

  // Discount Factor (2% discount rate)
  const discountRate = 0.02;
  const discountFactors = years.map((year, i) => 
    Math.pow(1 / (1 + discountRate), year)
  );

  // Present Value
  const presentValue = years.map((year, i) => 
    Math.round(freeCashFlow[i] * discountFactors[i])
  );

  const npv = presentValue.reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-12">
      {/* Critical Issues Alert */}
      <section className="py-8 bg-red-50 border-b-4 border-red-500 rounded-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-red-900 mb-3">⚠️ Critical Financial Issues Identified</h2>
            <div className="space-y-2 text-sm text-red-800">
              <p><strong>1. Debt Service Mismatch:</strong> Annual debt service of $5.65M exceeds NOI by $4M+. This suggests either:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Debt amount is miscalculated (should be ~$15-20M, not $87M+)</li>
                <li>Interest rate is too high (should be ~5-6%, not 6.5%+)</li>
                <li>Project cost assumptions need review</li>
              </ul>
              <p className="mt-3"><strong>2. Affordable Housing Financing Not Applied:</strong> LIHTC equity ($11M), tax-exempt bonds ($9M), and soft loans ($5M) totaling $25M should reduce debt/equity needs but aren't reflected in cash flows.</p>
              <p><strong>3. Ground Lease Impact:</strong> $1.05M annual ground lease represents ~75% of stabilized NOI, significantly impacting returns.</p>
              <p><strong>4. Current NPV:</strong> <span className="font-bold text-red-900">-${Math.abs(npv).toLocaleString()}</span> - Project is not financially viable as modeled.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Forma Table */}
      <section className="py-12 bg-white rounded-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-3 text-left border border-neutral-700">Line Item</th>
                  {years.map(year => (
                    <th key={year} className="p-3 text-right border border-neutral-700 min-w-[100px]">Year {year}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-neutral-50">
                  <td className="p-3 font-semibold border border-neutral-300">Growth Factor</td>
                  {growthFactors.map((gf, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">{gf.toFixed(4)}</td>
                  ))}
                </tr>
                
                {/* Market Residential */}
                <tr className="bg-blue-50">
                  <td colSpan={11} className="p-2 font-bold text-blue-900 border border-neutral-300">MARKET RESIDENTIAL</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 1BR Units</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{market1BRUnits}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 1BR Base Rent (Monthly)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${market1BRRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 1BR GPR (Annual)</td>
                  {market1BRGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 2BR Units</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{market2BRUnits}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 2BR Base Rent (Monthly)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${market2BRRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 2BR GPR (Annual)</td>
                  {market2BRGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 3BR Units</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{market3BRUnits}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 3BR Base Rent (Monthly)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${market3BRRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market 3BR GPR (Annual)</td>
                  {market3BRGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="bg-blue-100">
                  <td className="p-3 pl-4 font-semibold border border-neutral-300">Total Market GPR</td>
                  {totalMarketGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market Residential Vacancy Rate</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">5%</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Market Residential Vacancy Amount</td>
                  {marketVacancy.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="bg-blue-100">
                  <td className="p-3 pl-4 font-semibold border border-neutral-300">Market Residential EGI</td>
                  {marketEGI.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                {/* Affordable Residential */}
                <tr className="bg-green-50">
                  <td colSpan={11} className="p-2 font-bold text-green-900 border border-neutral-300">AFFORDABLE RESIDENTIAL</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 1BR Units</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{affordable1BRUnits}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 1BR Base Rent (Monthly)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${affordable1BRRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 1BR GPR (Annual)</td>
                  {affordable1BRGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 2BR Units</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{affordable2BRUnits}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 2BR Base Rent (Monthly)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${affordable2BRRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 2BR GPR (Annual)</td>
                  {affordable2BRGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 3BR Units</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{affordable3BRUnits}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 3BR Base Rent (Monthly)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${affordable3BRRent.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable 3BR GPR (Annual)</td>
                  {affordable3BRGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="bg-green-100">
                  <td className="p-3 pl-4 font-semibold border border-neutral-300">Total Affordable GPR</td>
                  {totalAffordableGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable Residential Vacancy Rate</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">5%</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Affordable Residential Vacancy Amount</td>
                  {affordableVacancy.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="bg-green-100">
                  <td className="p-3 pl-4 font-semibold border border-neutral-300">Affordable Residential EGI</td>
                  {affordableEGI.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-blue-200">
                  <td className="p-3 pl-2 font-bold border border-neutral-300">TOTAL RESIDENTIAL EGI</td>
                  {totalResidentialEGI.map((val, i) => (
                    <td key={i} className="p-3 text-right font-bold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                {/* Retail */}
                <tr className="bg-yellow-50">
                  <td colSpan={11} className="p-2 font-bold text-yellow-900 border border-neutral-300">RETAIL</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Retail SF</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{retailSF.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Retail Rent per SF (Annual)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${retailRentPerSF}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Retail GPR (Annual)</td>
                  {retailGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Retail Vacancy Rate</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">10%</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Retail Vacancy Amount</td>
                  {retailVacancy.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="bg-yellow-100">
                  <td className="p-3 pl-4 font-semibold border border-neutral-300">Retail EGI</td>
                  {retailEGI.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                {/* Office */}
                <tr className="bg-purple-50">
                  <td colSpan={11} className="p-2 font-bold text-purple-900 border border-neutral-300">OFFICE</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Office SF</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">{officeSF.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Office Rent per SF (Annual)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">${officeRentPerSF}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Office GPR (Annual)</td>
                  {officeGPR.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Office Vacancy Rate</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">12%</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Office Vacancy Amount</td>
                  {officeVacancy.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>
                <tr className="bg-purple-100">
                  <td className="p-3 pl-4 font-semibold border border-neutral-300">Office EGI</td>
                  {officeEGI.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-neutral-200">
                  <td className="p-3 pl-2 font-bold border border-neutral-300">TOTAL EFFECTIVE GROSS INCOME</td>
                  {totalEGI.map((val, i) => (
                    <td key={i} className="p-3 text-right font-bold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 border border-neutral-300">Operating Expense Ratio</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">35%</td>
                </tr>
                <tr>
                  <td className="p-3 border border-neutral-300">Operating Expenses</td>
                  {operatingExpenses.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-neutral-50">
                  <td colSpan={11} className="p-2 font-bold text-neutral-900 border border-neutral-300">GROUND LEASE</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Development Phase Ground Rent (Annual)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">$50,000</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Post-Completion Base Ground Rent (Year 1 Ops)</td>
                  <td colSpan={10} className="p-3 text-right border border-neutral-300">$1,054,152</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6 border border-neutral-300">Ground Lease Expense (Annual)</td>
                  {groundLeaseExpense.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-green-200">
                  <td className="p-3 pl-2 font-bold border border-neutral-300">NET OPERATING INCOME (NOI)</td>
                  {noi.map((val, i) => (
                    <td key={i} className="p-3 text-right font-bold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-red-50">
                  <td className="p-3 border border-neutral-300">Debt Service (Interest-Only)</td>
                  {years.map(() => (
                    <td key={Math.random()} className="p-3 text-right border border-neutral-300 font-semibold text-red-700">${debtService.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-red-100">
                  <td className="p-3 font-semibold border border-neutral-300">Cash Flow Before Sale</td>
                  {cashFlowBeforeSale.map((val, i) => (
                    <td key={i} className="p-3 text-right font-semibold border border-neutral-300 text-red-700">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-neutral-50">
                  <td className="p-3 border border-neutral-300">Terminal Value (Year 10 Only)</td>
                  {years.map((year, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">
                      {i === 9 ? `$${terminalValue.toLocaleString()}` : '-'}
                    </td>
                  ))}
                </tr>

                <tr className="bg-blue-200">
                  <td className="p-3 font-bold border border-neutral-300">Free Cash Flow to Equity</td>
                  {freeCashFlow.map((val, i) => (
                    <td key={i} className="p-3 text-right font-bold border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 border border-neutral-300">Discount Factor (2%)</td>
                  {discountFactors.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">{val.toFixed(4)}</td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 border border-neutral-300">Present Value of FCF</td>
                  {presentValue.map((val, i) => (
                    <td key={i} className="p-3 text-right border border-neutral-300">${val.toLocaleString()}</td>
                  ))}
                </tr>

                <tr className="bg-neutral-900 text-white">
                  <td className="p-4 font-bold text-lg border border-neutral-700">Net Present Value (NPV)</td>
                  <td colSpan={10} className="p-4 text-right font-bold text-lg border border-neutral-700">
                    ${npv.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Affordable Financing Details */}
      <section className="py-12 bg-neutral-50 rounded-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-8">Affordable Housing Financing & Specifics</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-900 text-white">
                <tr>
                  <th className="p-4 text-left">Item</th>
                  <th className="p-4 text-right">Value</th>
                  <th className="p-4 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">LIHTC Equity</td>
                  <td className="p-4 text-right">$11,000,000</td>
                  <td className="p-4 text-neutral-600">Assumes ~40% of affordable development cost covered through 4% LIHTC equity; typical range is 30–70% depending on basis and credit pricing.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Tax-Exempt Bond Financing</td>
                  <td className="p-4 text-right">$9,000,000</td>
                  <td className="p-4 text-neutral-600">Sized to meet the 50% test for 4% credits; provides below-market construction and permanent debt for the affordable portion.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Soft/Public Loans</td>
                  <td className="p-4 text-right">$5,000,000</td>
                  <td className="p-4 text-neutral-600">Assumes ~$90k per affordable unit from city/county/state programs; typical range is $50k–$150k per unit.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Operating Subsidies (if needed)</td>
                  <td className="p-4 text-right">$0–$300,000/yr</td>
                  <td className="p-4 text-neutral-600">Required only if including 30% AMI/special-needs units; provides rental subsidies to maintain operations.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Affordable Operating Reserves</td>
                  <td className="p-4 text-right">6 months OpEx</td>
                  <td className="p-4 text-neutral-600">LIHTC underwriting generally requires 4–6 months of operating expenses in reserve for stability.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Replacement Reserves</td>
                  <td className="p-4 text-right">$350/unit/year</td>
                  <td className="p-4 text-neutral-600">Standard LIHTC reserve requirement; ensures long-term capital maintenance.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Compliance & Monitoring Fees</td>
                  <td className="p-4 text-right">$30,000/year</td>
                  <td className="p-4 text-neutral-600">Annual reporting, audits, and monitoring fees required by investors and regulatory agencies; typical range $20k–$40k.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">Developer Fee Limits</td>
                  <td className="p-4 text-right">$2,000,000 cap</td>
                  <td className="p-4 text-neutral-600">LIHTC rules cap eligible developer fee and often require deferral; amount depends on basis and program rules.</td>
                </tr>
                <tr className="border-b border-neutral-200">
                  <td className="p-4 font-semibold">AMI Rent Restrictions</td>
                  <td className="p-4 text-right">HUD AMI Schedules</td>
                  <td className="p-4 text-neutral-600">Rents must follow 30–60% AMI limits minus utility allowances; restricts achievable residential income.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Affordability Covenant Term</td>
                  <td className="p-4 text-right">55 years</td>
                  <td className="p-4 text-neutral-600">Standard regulatory agreement term for LIHTC and city funding; fixes long-term affordability.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Assumptions */}
      <section className="py-12 bg-white rounded-lg">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light mb-8">Key Assumptions & Notes</h2>
          <div className="bg-neutral-50 rounded-lg p-6 space-y-4 text-sm text-neutral-700">
            <p><strong>1.</strong> All residential, retail, office, and ground rents grow at the Annual Rent Growth Rate from the Data sheet (2% annually).</p>
            <p><strong>2.</strong> Market and affordable residential income are modeled separately by unit type (1BR, 2BR, 3BR) with explicit vacancy and EGI subtotals.</p>
            <p><strong>3.</strong> Operating expenses are loaded as a flat percentage of total EGI using the Operating Expenses ratio from the Data sheet (35%).</p>
            <p><strong>4.</strong> Ground lease expense uses the development-phase rent during the Development Time (months) and switches to Base Ground Rent After Completion thereafter.</p>
            <p><strong>5.</strong> Debt service is modeled as interest-only on the Debt (65%) input; equity is taken from Equity (35%).</p>
            <p><strong>6.</strong> Terminal value in Year 10 is calculated by capitalizing Year 11 NOI (Year 10 NOI grown one year) at the Cap Rate (5.5%).</p>
            <p><strong>7.</strong> Affordable financing specifics (LIHTC, soft loans, reserves, fees) are summarized above but not fully broken out in the annual cash flows.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

