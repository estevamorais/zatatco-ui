import { useState } from "react";
import { CheckCircleIcon, ChevronDownIcon } from "../icons";
import { mockCompanies } from "../mocks/companies";
import type { Company } from "../types";
import { Popover } from "./Popover";
import styles from "./CompanySelector.module.css";

export interface CompanySelectorProps {
  /** Lista de empresas. Padrão: empresas mocadas. */
  companies?: Company[];
  /** Id da empresa selecionada (controlado). Se omitido, o componente controla sozinho. */
  selectedCompanyId?: string;
  /** Chamado ao escolher uma empresa. */
  onSelectCompany?: (company: Company) => void;
  disabled?: boolean;
}

/** Seletor de empresa do canto esquerdo do header. */
export function CompanySelector({
  companies = mockCompanies,
  selectedCompanyId,
  onSelectCompany,
  disabled = false,
}: CompanySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalId, setInternalId] = useState(() => companies[0]?.id);

  const isControlled = selectedCompanyId !== undefined;
  const currentId = isControlled ? selectedCompanyId : internalId;
  const selectedCompany = companies.find((company) => company.id === currentId);

  if (companies.length === 0) {
    return null;
  }

  const handleSelect = (company: Company) => {
    if (!isControlled) {
      setInternalId(company.id);
    }
    onSelectCompany?.(company);
    setIsOpen(false);
  };

  return (
    <Popover
      opened={isOpen}
      onClose={() => setIsOpen(false)}
      align="start"
      dropdownWidth={307}
      trigger={
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((current) => !current)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <span className={styles.triggerText}>
            <span className={styles.companyName}>{selectedCompany?.name ?? "Selecione a empresa"}</span>
            <span className={styles.companyDocument}>{selectedCompany?.document ?? ""}</span>
          </span>
          <ChevronDownIcon
            className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
            width={24}
            height={24}
          />
        </button>
      }
    >
      <div className={styles.list}>
        {companies.map((company) => {
          const selected = company.id === currentId;
          return (
            <button
              type="button"
              key={company.id}
              className={`${styles.option} ${selected ? styles.optionSelected : ""}`}
              onClick={() => handleSelect(company)}
              aria-current={selected ? "true" : undefined}
            >
              <span className={styles.optionText}>
                <span className={`${styles.optionName} ${selected ? styles.optionNameSelected : ""}`}>
                  {company.name}
                </span>
                <span className={styles.companyDocument}>{company.document}</span>
              </span>
              {selected ? <CheckCircleIcon className={styles.check} width={24} height={24} /> : null}
            </button>
          );
        })}
      </div>
    </Popover>
  );
}
