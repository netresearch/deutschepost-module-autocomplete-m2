<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Model;

use Magento\Framework\Exception\LocalizedException;
use PostDirekt\Core\Api\ConfigInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Api\ServiceFactoryInterface;
use PostDirekt\Sdk\Autocomplete\Authentication\Exception\ServiceException;
use Psr\Log\LoggerInterface;

class AuthService
{
    public function __construct(private ConfigInterface $coreConfig, private ServiceFactoryInterface $authServiceFactory, private LoggerInterface $logger)
    {
    }

    /**
     * @return string
     * @throws LocalizedException
     */
    public function fetchToken(): string
    {
        $apiUser = $this->coreConfig->getApiUser();
        $apiPassword = $this->coreConfig->getApiPassword();

        try {
            $authService = $this->authServiceFactory
                ->createAuthenticationService($apiUser, $apiPassword, $this->logger);
            $token = $authService->authenticate();
        } catch (ServiceException $exception) {
            throw new LocalizedException(__('Unable to fetch token'), $exception);
        }

        return $token->getAccessToken();
    }
}
