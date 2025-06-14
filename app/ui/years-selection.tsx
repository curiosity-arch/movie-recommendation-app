'use client'

import { useState } from 'react';

const YearSelectionForm = () => {
  // Mendapatkan tahun saat ini
  const currentYear = new Date().getFullYear();
  
  // Membuat array tahun dari 100 tahun terakhir
  const years = Array.from({ length: 55 }, (_, i) => currentYear - i);

  // State untuk menyimpan tahun yang dipilih
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Menangani perubahan tahun
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div>
      <select 
        id="birthYear" 
        name="birthYear" 
        value={selectedYear} 
        onChange={handleYearChange}
        >
        <option disabled>Pilih Tahun Lahir</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>
    </div>
  );
};

export default YearSelectionForm;