<?php
/**
 * See LICENSE.md for license details.
 */
declare(strict_types=1);

namespace PostDirekt\Autocomplete\ViewModel\Adminhtml\System;

use PostDirekt\Autocomplete\Model\ModuleConfig;
use Magento\Framework\View\Element\Block\ArgumentInterface;

/**
 * Class InfoBox
 *
 * @author  Gurjit Singh <gurjit.singh@netresearch.de>
 * @link    https://www.netresearch.de/
 */
class InfoBox implements ArgumentInterface
{
    /**
     * @var ModuleConfig
     */
    private $config;

    /**
     * InfoBox constructor.
     *
     * @param ModuleConfig $config
     */
    public function __construct(ModuleConfig $config)
    {
        $this->config = $config;
    }

    /**
     * Obtain the Module Version from Config.
     *
     * @return string
     */
    public function getModuleVersion(): string
    {
        return $this->config->getModuleVersion();
    }
}
