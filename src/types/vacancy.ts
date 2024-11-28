export type SalaryRange = {
  min: number;
  optimal: number;
};

export type Vacancy = {
  id?: string;
  companyName: string;
  vacancy: string;
  salaryRange: SalaryRange;
  status: string;
  note: string;
};