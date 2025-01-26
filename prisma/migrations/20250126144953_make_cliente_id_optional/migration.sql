-- DropForeignKey
ALTER TABLE `ativos` DROP FOREIGN KEY `ativos_clienteId_fkey`;

-- DropIndex
DROP INDEX `ativos_clienteId_fkey` ON `ativos`;

-- AlterTable
ALTER TABLE `ativos` MODIFY `clienteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ativos` ADD CONSTRAINT `ativos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
