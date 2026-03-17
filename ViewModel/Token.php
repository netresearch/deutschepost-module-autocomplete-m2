<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\ViewModel;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use PostDirekt\Autocomplete\Model\AuthService;
use PostDirekt\Autocomplete\Model\ModuleConfig;

class Token implements ArgumentInterface
{
    public function __construct(private AuthService $authService, private ModuleConfig $moduleConfig)
    {
    }

    /**
     * Provide token from auth service
     */
    public function getToken(): ?string
    {
        if (!$this->moduleConfig->isActive()) {
            return null;
        }
        try {
            $token = $this->authService->fetchToken();
        } catch (LocalizedException) {
            return null;
        }

        return $token;
    }

    /**
     * @return string|null
     */
    public function getHouseNumberHint(): ?string
    {
        if (!$this->moduleConfig->isHouseNumberHintActive()) {
            return null;
        }

        return $this->moduleConfig->getHouseNumberHint();
    }
}
