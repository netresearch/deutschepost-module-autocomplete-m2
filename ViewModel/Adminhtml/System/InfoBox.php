<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\ViewModel\Adminhtml\System;

use PostDirekt\Autocomplete\Model\ModuleConfig;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class InfoBox implements ArgumentInterface
{
    /**
     * @var ModuleConfig
     */
    private $config;

    public function __construct(ModuleConfig $config)
    {
        $this->config = $config;
    }

    public function getModuleVersion(): string
    {
        return $this->config->getModuleVersion();
    }
}
