<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Setup;

use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\UninstallInterface;

class Uninstall implements UninstallInterface
{
    /**
     * @param SchemaSetupInterface $setup
     * @param ModuleContextInterface $context
     */
    #[\Override]
    public function uninstall(SchemaSetupInterface $setup, ModuleContextInterface $context): void
    {
        $defaultConnection = $setup->getConnection();
        $configTable = $setup->getTable('core_config_data');
        $defaultConnection->delete($configTable, "`path` LIKE 'postidrekt/autocomplete/%'");
    }
}
