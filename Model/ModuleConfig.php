<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Model;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class ModuleConfig
{
    private const CONFIG_PATH_VERSION = 'postdirekt/autocomplete/version';
    private const CONFIG_PATH_ACTIVE = 'postdirekt/autocomplete/active';

    private const CONFIG_PATH_ACTIVE_HOUSENUMBER_HINT = 'postdirekt/autocomplete/active_housenumber_hint';
    private const CONFIG_PATH_HOUSENUMBER_HINT = 'postdirekt/autocomplete/housenumber_hint';

    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    public function __construct(
        ScopeConfigInterface $scopeConfig
    ) {
        $this->scopeConfig = $scopeConfig;
    }

    public function isActive(?string $store = null): bool
    {
        return (bool) $this->scopeConfig->getValue(
            self::CONFIG_PATH_ACTIVE,
            ScopeInterface::SCOPE_STORE,
            $store
        );
    }

    /**
     * Obtain the module version from config.
     *
     * @return string
     */
    public function getModuleVersion(): string
    {
        return $this->scopeConfig->getValue(self::CONFIG_PATH_VERSION);
    }

    /**
     * @param string|int|null $store
     * @return bool
     */
    public function isHouseNumberHintActive($store = null): bool
    {
        return (bool) $this->scopeConfig->getValue(
            self::CONFIG_PATH_ACTIVE_HOUSENUMBER_HINT,
            ScopeInterface::SCOPE_STORE,
            $store
        );
    }

    /**
     * @param string|int|null $store
     * @return string
     */
    public function getHouseNumberHint($store = null): string
    {
        return (string) $this->scopeConfig->getValue(
            self::CONFIG_PATH_HOUSENUMBER_HINT,
            ScopeInterface::SCOPE_STORE,
            $store
        );
    }
}
