// init.ns.ts
import * as cls from 'continuation-local-storage';

export const tenantNamespace = cls.createNamespace('tenantNamespace');

// Function to set the tenant ID in the namespace
export function setTenantId(tenantId: string): void {
  tenantNamespace.set('tenantId', tenantId);
}



// Function to get the tenant ID from the namespace
export function getTenantId(): string | undefined {
  return tenantNamespace.get('tenantId');
}

// Initialize the namespace (optional)
(function init() {
  tenantNamespace.run(() => {
    tenantNamespace.set('tenantId', undefined);
    console.log(`Tenant ID initialized::default`.blue);
  });
})();




export const setMasterTenantId = () => {
  tenantNamespace.run(() => {
    setTenantId(process.env.MASTER_DB_NAME!);
  })
}