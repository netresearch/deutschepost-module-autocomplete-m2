<?php
/**
 * See LICENSE.md for license details.
 */
declare(strict_types=1);

namespace PostDirekt\Autocomplete\Model;

use Magento\Framework\Exception\LocalizedException;
use PostDirekt\Core\Api\ConfigInterface;
use PostDirekt\Sdk\Autocomplete\Api\ServiceFactoryInterface;
use PostDirekt\Sdk\Autocomplete\Exception\ServiceException;
use Psr\Log\LoggerInterface;

/**
 * Class AuthService
 *
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 * @link     https://www.netresearch.de/
 */
class AuthService
{
    /**
     * @var ConfigInterface
     */
    private $coreConfig;

    /**
     * @var ServiceFactoryInterface
     */
    private $authServiceFactory;

    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(
        ConfigInterface $coreConfig,
        ServiceFactoryInterface $authServiceFactory,
        LoggerInterface $logger
    ) {
        $this->coreConfig = $coreConfig;
        $this->authServiceFactory = $authServiceFactory;
        $this->logger = $logger;
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
            $authService = $this->authServiceFactory->createAuthenticationService($this->logger);
            $token = $authService->authenticate($apiUser, $apiPassword);
        } catch (ServiceException $exception) {
            throw new LocalizedException(__('Unable to fetch token'));
        }

        return $token->getAccessToken();
    }
}
