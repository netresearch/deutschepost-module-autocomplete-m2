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
    /**
     * @var AuthService
     */
    private $authService;

    /**
     * @var ModuleConfig
     */
    private $moduleConfig;

    public function __construct(AuthService $authService, ModuleConfig $moduleConfig)
    {
        $this->authService = $authService;
        $this->moduleConfig = $moduleConfig;
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
        } catch (LocalizedException $exception) {
            return null;
        }

        return $token;
    }
}
